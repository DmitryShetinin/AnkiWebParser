



using Application.Abstractions;
using Core.Models;

public sealed class MerriamDictionaryService : IDictionaryService
{
    private readonly IDictionaryClient _client;
    private readonly IDictionaryParser _parser;

    public async Task<WordEntry> GetWordAsync(
        string word,
        CancellationToken cancellationToken)
    {
        var response =
            await _client.GetAsync(word, cancellationToken);

        return _parser.Parse(response);
    }
}