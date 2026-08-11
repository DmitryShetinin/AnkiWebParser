
namespace Core.Models;

public sealed class PartOfSpeechEntry
{
    public required string PartOfSpeech { get; init; }

    public IReadOnlyList<Meaning> Meanings { get; init; } = [];
}

