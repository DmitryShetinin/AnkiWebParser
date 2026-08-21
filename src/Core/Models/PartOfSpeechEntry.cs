
namespace Core.Models;

public sealed class PartOfSpeechEntry
{

    public required Guid ExternalId { get; init; }
    public required string PartOfSpeech { get; init; }

    public IReadOnlyList<Meaning> Meanings { get; init; } = [];
}

