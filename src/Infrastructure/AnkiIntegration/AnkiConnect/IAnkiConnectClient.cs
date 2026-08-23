 

namespace AnkiIntegration.AnkiConnect;

public interface IAnkiConnectClient
{
    Task<AnkiResponse<List<long?>>> AddNotesAsync(
        List<AnkiNoteDto> notes,
        CancellationToken cancellationToken = default);

    Task<AnkiResponse<List<long>>> FindNotesAsync(
        string query,
        CancellationToken cancellationToken = default);

    Task<AnkiResponse<T>> SendRequestAsync<T>(
        object request,
        CancellationToken cancellationToken = default);
}