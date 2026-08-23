using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace AnkiIntegration.AnkiConnect;

public sealed class AnkiConnectClient : IAnkiConnectClient
{
    private readonly HttpClient _httpClient;



    private static readonly JsonSerializerOptions _jsonOptions = new()
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

    public async Task<AnkiResponse<T>> SendRequestAsync<T>(
    object requestData,
    CancellationToken cancellationToken = default)
    {
        var json = JsonSerializer.Serialize(
            requestData,
            _jsonOptions);

        using var content = new StringContent(
            json,
            Encoding.UTF8,
            "application/json");

        using var response = await _httpClient.PostAsync(
            "",
            content,
            cancellationToken);

        var responseJson = await response.Content.ReadAsStringAsync(
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var result = JsonSerializer.Deserialize<AnkiResponse<T>>(
            responseJson,
            _jsonOptions);

        return result
            ?? throw new InvalidOperationException(
                $"Failed to deserialize Anki response: {responseJson}");
    }
}