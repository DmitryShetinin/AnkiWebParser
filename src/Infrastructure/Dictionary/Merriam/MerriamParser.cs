using Application.Abstractions;
using Application.Merriam;
using Application.Merriam.Response;
using Core.Models;
using System.Text.Json;

public sealed class MerriamParser : IDictionaryParser
{
    private readonly IMerriamTextFormatter _textFormatter;
    public MerriamParser(IMerriamTextFormatter textFormatter)
    {
        _textFormatter = textFormatter;
    }

    public WordEntry Parse(IReadOnlyList<MerriamEntryDto> entries)
    {
        return Parse(entries, new DictionarySettings());
    }

    public WordEntry Parse(IReadOnlyList<MerriamEntryDto> entries, DictionarySettings settings)
    {
        if (entries is null || entries.Count == 0)
            throw new ArgumentException(
                "Entries cannot be null or empty.",
                nameof(entries));

        var word = entries[0].Hwi.Hw;

        var parsedEntries = entries
            .Select(entry => ParseEntry(entry, settings))
            .ToList();

        return new WordEntry
        {
            Id = Guid.NewGuid(),
            Word = word,
            Entries = parsedEntries
        };
    }

    public static string CreateExternalId(
        string merriamUuid,
        string? senseNumber)
    {
        return string.IsNullOrWhiteSpace(senseNumber)
            ? merriamUuid
            : $"{merriamUuid}:{senseNumber}";
    }

    private PartOfSpeechEntry ParseEntry(MerriamEntryDto entry, DictionarySettings settings)
    {
        return new PartOfSpeechEntry
        {
            // UUID всей Merriam entry.
            ExternalId = entry.Meta.Uuid,

            PartOfSpeech = entry.Fl,

            // Передаём UUID entry дальше,
            // чтобы каждый Meaning получил свой ExternalId.
            Meanings = ParseMeanings(
                entry.Def,
                entry.Meta.Uuid.ToString(), settings)
        };
    }

    private IReadOnlyList<Meaning> ParseMeanings(
        IReadOnlyList<MerriamDefinitionBlockDto> definitions,
        string merriamUuid,
        DictionarySettings settings)
    {
        var meanings = new List<Meaning>();

        foreach (var definition in definitions)
        {
            foreach (var sense in ExtractSenses(definition.Sseq))
            {
                meanings.Add(
                    ParseMeaning(
                        sense,
                        merriamUuid, settings));
            }
        }

        return meanings;
    }

    private List<MerriamSenseDto> ExtractSenses(JsonElement sseq)
    {
        var senses = new List<MerriamSenseDto>();

        ExtractSensesRecursive(sseq, senses);

        return senses;
    }

    private void ExtractSensesRecursive(
        JsonElement element,
        ICollection<MerriamSenseDto> senses)
    {
        if (element.ValueKind != JsonValueKind.Array)
            return;

        // ["sense", { ... }]
        if (element.GetArrayLength() == 2 &&
            element[0].ValueKind == JsonValueKind.String &&
            element[0].GetString() == "sense" &&
            element[1].ValueKind == JsonValueKind.Object)
        {
            var sense = element[1].Deserialize<MerriamSenseDto>();

            if (sense is not null)
                senses.Add(sense);

            return;
        }

        foreach (var child in element.EnumerateArray())
        {
            ExtractSensesRecursive(child, senses);
        }
    }

    private Meaning ParseMeaning(
        MerriamSenseDto sense,
        string merriamUuid,
        DictionarySettings settings)
    {
        string? definition = null;

        var examples = new List<string>();
        var synonyms = new List<string>();
        var antonyms = new List<string>();
        var relatedWords = new List<string>();

        foreach (var item in sense.Dt.EnumerateArray())
        {
            if (item.ValueKind != JsonValueKind.Array ||
                item.GetArrayLength() < 2)
            {
                continue;
            }

            var type = item[0].GetString();

            switch (type)
            {
                case "text":
                    definition = ParseText(item[1]);
                    break;

                case "vis":
                    examples.AddRange(
                        ParseExamples(item[1]));
                    break;
            }
        }

        synonyms.AddRange(
            ParseWords(sense.SynList).Take(Math.Max(0, settings.MaxSynonyms)));

        antonyms.AddRange(
            ParseWords(sense.AntList).Take(Math.Max(0, settings.MaxAntonyms)));

        relatedWords.AddRange(
            ParseWords(sense.RelList).Take(Math.Max(0, settings.MaxRelatedWords)));

        return new Meaning
        {
            Id = Guid.NewGuid(),

            ExternalId = CreateExternalId(
          merriamUuid,
          sense.SenseNumber),

            Definition = definition ?? string.Empty,
            Examples = examples.Take(Math.Max(0, settings.MaxExamples)).ToList(),
            Synonyms = synonyms,
            Antonyms = antonyms,
            RelatedWords = relatedWords
        };
    }

    private IEnumerable<string> ParseWords(JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.Array)
            yield break;

        foreach (var group in value.EnumerateArray())
        {
            if (group.ValueKind != JsonValueKind.Array)
                continue;

            foreach (var item in group.EnumerateArray())
            {
                if (!item.TryGetProperty(
                        "wd",
                        out var word))
                {
                    continue;
                }

                var text = word.GetString();

                if (!string.IsNullOrWhiteSpace(text))
                    yield return text;
            }
        }
    }

    private string ParseText(JsonElement value)
    {
        var text = value.GetString() ?? string.Empty;

        return _textFormatter.Format(text);
    }

    private IEnumerable<string> ParseExamples(JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.Array)
            yield break;

        foreach (var example in value.EnumerateArray())
        {
            if (example.ValueKind != JsonValueKind.Object)
                continue;

            if (!example.TryGetProperty(
                    "t",
                    out var text))
            {
                continue;
            }

            var exampleText = text.GetString();

            if (!string.IsNullOrWhiteSpace(exampleText))
                yield return _textFormatter.Format(exampleText);
        }
    }
}
