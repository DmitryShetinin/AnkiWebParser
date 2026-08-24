
namespace Core.Models;

public sealed class Card
{
    public Guid UserId { get; set; }
    public required string Word { get; init; }
    public required string PartOfSpeech { get; init; }
    public required string Definition { get; init; }
    public required string ExternalId { get; init; }
    public IReadOnlyList<string> Examples { get; init; } = [];
    public IReadOnlyList<string> Synonyms { get; init; } = [];
    public IReadOnlyList<string> Antonyms { get; init; } = [];

    public IReadOnlyList<string> RelatedWords { get; init; } = [];
}

