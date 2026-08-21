

using Core.Models;

public interface IAnkiCardImporter
{
    Task<AnkiImportResult> ImportAsync(
        IReadOnlyList<Card> cards,
        CancellationToken cancellationToken = default);
}