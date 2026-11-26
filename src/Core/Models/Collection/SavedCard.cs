namespace Core.Models.Collection;

public sealed class SavedCard
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public string ExternalId { get; private set; } = string.Empty;
    public string Word { get; private set; } = string.Empty;
    public string PartOfSpeech { get; private set; } = string.Empty;
    public string Definition { get; private set; } = string.Empty;
    public List<string> Examples { get; private set; } = [];
    public List<string> Synonyms { get; private set; } = [];
    public List<string> Antonyms { get; private set; } = [];
    public List<string> RelatedWords { get; private set; } = [];
    public DateTime CreatedAt { get; private set; }
    public Core.Models.User.User User { get; private set; } = null!;
    public ICollection<DeckCard> DeckMemberships { get; private set; } = new List<DeckCard>();

    private SavedCard() { }

    public static SavedCard Create(Guid userId, string externalId, string word, string partOfSpeech, string definition,
        IEnumerable<string>? examples, IEnumerable<string>? synonyms, IEnumerable<string>? antonyms, IEnumerable<string>? relatedWords) =>
        new()
        {
            Id = Guid.NewGuid(), UserId = userId, ExternalId = externalId, Word = word,
            PartOfSpeech = partOfSpeech, Definition = definition,
            Examples = examples?.ToList() ?? [], Synonyms = synonyms?.ToList() ?? [],
            Antonyms = antonyms?.ToList() ?? [], RelatedWords = relatedWords?.ToList() ?? [], CreatedAt = DateTime.UtcNow
        };
}
