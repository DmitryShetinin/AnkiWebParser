using Core.Models;

public sealed class AnkiCardMapper
{
    private const string DictionaryIdField = "DictionaryId";

    public AnkiNoteDto Map(
        Card card,
        string deckName,
        string modelName)
    {
        return new AnkiNoteDto
        {
            DeckName = deckName,
            ModelName = modelName,
            Fields = new Dictionary<string, string>
            {
                [DictionaryIdField] = card.ExternalId.ToString(),
                ["Word"] = card.Word,
                ["PartOfSpeech"] = card.PartOfSpeech,
                ["Meaning"] = card.Definition,
                ["Examples"] = string.Join("<br>", card.Examples),
                ["Synonyms"] = string.Join(", ", card.Synonyms),
                ["Antonyms"] = string.Join(", ", card.Antonyms),
                ["RelatedWords"] = string.Join(", ", card.RelatedWords)
            }
        };
    }
}