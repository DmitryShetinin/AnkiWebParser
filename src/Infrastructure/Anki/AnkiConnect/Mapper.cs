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
                ["Word"] = card.Word,
                ["PartOfSpeech"] = card.PartOfSpeech,
                ["Meaning"] = card.Definition,
                ["Examples"] = string.Join("<br>", card.Examples),
                ["Synonyms"] = string.Join(", ", card.Synonyms),
                ["RelatedWords"] = string.Join(", ", card.RelatedWords),
                [DictionaryIdField] = card.ExternalId.ToString()
            }
        };
    }
}