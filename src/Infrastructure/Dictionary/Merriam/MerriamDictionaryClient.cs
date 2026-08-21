



using Application.Merriam;
using Application.Merriam.Response;
using Infrastructure.Dictionary.Merriam;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;



public sealed class DictionaryClient(
    HttpClient httpClient,
    IOptions<DictionaryOptions> options) : IDictionaryClient
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly DictionaryOptions _options = options.Value;

    public async Task<IReadOnlyList<MerriamEntryDto>> GetAsync(
    string word,
    CancellationToken cancellationToken)
    {
        var encodedWord = Uri.EscapeDataString(word);

        var url =
            $"https://dictionaryapi.com/api/v3/references/ithesaurus/json/{encodedWord}?key={_options.ApiKey}";

        using var response = await _httpClient.GetAsync(
            url,
            HttpCompletionOption.ResponseHeadersRead,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var entries = await response.Content.ReadFromJsonAsync<
            List<MerriamEntryDto>>(
            cancellationToken);

        return entries ?? [];
    }
}
