
using Application.Merriam.Response;

using Application.Abstractions;
using Core.Models;
using Application.Merriam;
using System.Text.Json;


class MerriamParser : IDictionaryParser
{


    private readonly IMerriamTextFormatter _textFormatter;


    public MerriamParser(IMerriamTextFormatter textFormatter)
    {
        _textFormatter = textFormatter;
    }

    public WordEntry Parse(IReadOnlyList<MerriamEntryDto> entries)
    {
        if (entries is null || entries.Count == 0)
            throw new ArgumentException(
                "Entries cannot be null or empty.",
                nameof(entries));

        var word = entries[0].Hwi.Hw;

        var parsedEntries = entries
            .Select(ParseEntry)
            .ToList();

        return new WordEntry
        {
            Id = Guid.NewGuid(),
            Word = word,
            Entries = parsedEntries
        };
    }

    private PartOfSpeechEntry ParseEntry(MerriamEntryDto entry)
    {
        return new PartOfSpeechEntry
        {
            ExternalId = entry.Meta.Uuid,
            PartOfSpeech = entry.Fl,
            Meanings = ParseMeanings(entry.Def)
        };
    }

    private IReadOnlyList<Meaning> ParseMeanings(
    IReadOnlyList<MerriamDefinitionBlockDto> definitions)
    {
        var meanings = new List<Meaning>();

        foreach (var definition in definitions)
        {
            foreach (var sense in ExtractSenses(definition.Sseq))
            {
                meanings.Add(ParseMeaning(sense));
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

        // Ищем конструкции вида:
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


    private Meaning ParseMeaning(MerriamSenseDto sense)
    {
        string? definition = null;
        var examples = new List<string>();
        var synonyms = new List<string>();
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
                    examples.AddRange(ParseExamples(item[1]));
                    break;

                case "syn_list":
                    synonyms.AddRange(ParseSynonyms(item[1]));
                    break;

                case "rel_list":
                    relatedWords.AddRange(ParseRelatedWords(item[1]));
                    break;
            }
        }

        return new Meaning
        {
            Definition = definition ?? string.Empty,
            Examples = examples,
            Synonyms = synonyms,
            RelatedWords = relatedWords
        };
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

            if (!example.TryGetProperty("t", out var text))
                continue;

            var exampleText = text.GetString();

            if (!string.IsNullOrWhiteSpace(exampleText))
                yield return exampleText;
        }
    }


    private IEnumerable<string> ParseSynonyms(JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.Array)
            yield break;

        foreach (var group in value.EnumerateArray())
        {
            if (group.ValueKind != JsonValueKind.Array)
                continue;

            foreach (var item in group.EnumerateArray())
            {
                if (!item.TryGetProperty("wd", out var word))
                    continue;

                var valueText = word.GetString();

                if (!string.IsNullOrWhiteSpace(valueText))
                    yield return valueText;
            }
        }
    }


    private IEnumerable<string> ParseRelatedWords(JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.Array)
            yield break;

        foreach (var group in value.EnumerateArray())
        {
            if (group.ValueKind != JsonValueKind.Array)
                continue;

            foreach (var item in group.EnumerateArray())
            {
                if (!item.TryGetProperty("wd", out var word))
                    continue;

                var valueText = word.GetString();

                if (!string.IsNullOrWhiteSpace(valueText))
                    yield return valueText;
            }
        }
    }





}