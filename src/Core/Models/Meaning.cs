


namespace Core.Models; 

public sealed class Meaning
{
    public Guid Id { get; init; }

    public required string Definition { get; init; }

    public IReadOnlyList<string> Examples { get; init; } = [];

    public IReadOnlyList<string> Synonyms { get; init; } = [];

    public IReadOnlyList<string> Antonyms { get; init; } = [];

    public IReadOnlyList<string> RelatedWords { get; init; } = [];

    public string? ExternalId { get; init; }
}