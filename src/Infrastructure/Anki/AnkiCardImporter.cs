
using AnkiIntegration.AnkiConnect;
using Core.Models;

namespace Infrastructure.Anki;

public sealed class AnkiCardImporter : IAnkiCardImporter
{
    private readonly IAnkiConnectClient _ankiClient;
    private readonly AnkiCardMapper _mapper;

    public AnkiCardImporter(
        IAnkiConnectClient ankiClient,
        AnkiCardMapper mapper)
    {
        _ankiClient = ankiClient;
        _mapper = mapper;
    }

    public async Task<AnkiImportResult> ImportAsync(
        IReadOnlyList<Card> cards,
        CancellationToken cancellationToken = default)
    {
        if (cards.Count == 0)
        {
            return new AnkiImportResult();
        }

        try
        {
            var notes = cards
            .Select(card => _mapper.Map(card, deckName, modelName))
            .ToList();

            var response = await _ankiClient.AddNotesAsync(
                notes,
                cancellationToken);

            if (response.Error is not null)
            {
                return new AnkiImportResult
                {
                    Errors = [response.Error]
                };
            }

            var noteIds = response.Result?
                .Where(id => id.HasValue)
                .Select(id => id!.Value)
                .ToList() ?? [];

            return new AnkiImportResult
            {
                ImportedCount = noteIds.Count,
                NoteIds = noteIds
            };
        }
        catch (OperationCanceledException)
        {
            throw;
        }
        catch (Exception ex)
        {
            return new AnkiImportResult
            {
                Errors = [ex.Message]
            };
        }
    }
}