using AnkiIntegration.AnkiConnect;
using Core.Models;
using Microsoft.Extensions.Options;

public sealed class AnkiCardImporter : IAnkiCardImporter
{
    private readonly IAnkiConnectClient _ankiClient;
    private readonly AnkiCardMapper _mapper;
    private readonly AnkiOptions _options;

    public AnkiCardImporter(
        IAnkiConnectClient ankiClient,
        AnkiCardMapper mapper,
        IOptions<AnkiOptions> options)
    {
        _ankiClient = ankiClient;
        _mapper = mapper;
        _options = options.Value;
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
                .Select(card => _mapper.Map(
                    card,
                    _options.DeckName,
                    _options.ModelName))
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