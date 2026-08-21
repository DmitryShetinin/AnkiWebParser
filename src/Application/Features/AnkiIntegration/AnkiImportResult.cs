public sealed class AnkiImportResult
{
    public int ImportedCount { get; init; }

    public IReadOnlyList<long> NoteIds { get; init; } = [];

    public IReadOnlyList<string> Errors { get; init; } = [];

    public bool Success => Errors.Count == 0;
}