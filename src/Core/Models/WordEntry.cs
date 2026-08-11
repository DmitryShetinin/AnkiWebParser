

namespace Core.Models; 


public sealed class WordEntry
{
    public required Guid Id { get; init; }
    public required string Word { get; init; }

    public IReadOnlyList<PartOfSpeechEntry> Entries { get; init; } = [];
}