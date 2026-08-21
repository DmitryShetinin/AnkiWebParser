using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
 

namespace AnkiIntegration.AnkiConnect;

public sealed class AnkiConnectClient : IAnkiConnectClient
{
    private readonly HttpClient _httpClient;

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public AnkiConnectClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public Task<AnkiResponse<List<long?>>> AddNotesAsync(
        List<AnkiNoteDto> notes,
        CancellationToken cancellationToken = default)
    {
        var request = new
        {
            action = "addNotes",
            version = 6,
            @params = new
            {
                notes
            }
        };

        return SendRequestAsync<List<long?>>(request, cancellationToken);
    }

    public Task<AnkiResponse<List<long>>> FindNotesAsync(
        string query,
        CancellationToken cancellationToken = default)
    {
        var request = new
        {
            action = "findNotes",
            version = 6,
            @params = new
            {
                query
            }
        };

        return SendRequestAsync<List<long>>(request, cancellationToken);
    }

    private async Task<AnkiResponse<T>> SendRequestAsync<T>(
        object requestData,
        CancellationToken cancellationToken)
    {
        using var response = await _httpClient.PostAsJsonAsync(
            string.Empty,
            requestData,
            JsonOptions,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var result =
            await response.Content.ReadFromJsonAsync<AnkiResponse<T>>(
                JsonOptions,
                cancellationToken);

        return result
            ?? throw new InvalidOperationException(
                "Failed to deserialize AnkiConnect response.");
    }
}