


namespace Core.Models; 

public sealed class Meaning
{
    public required string PartOfSpeech { get; init; }

    public required string Definition { get; init; }

    public IReadOnlyList<string> Examples { get; init; } = [];

    public IReadOnlyList<string> Synonyms { get; init; } = [];

    public IReadOnlyList<string> RelatedWords { get; init; } = [];
}