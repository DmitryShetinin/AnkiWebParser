



using Application;
using Application.Abstractions;
using Application.Dictionary.Merriam;
using Core.Models;


public sealed class MerriamDictionaryService : IMerriamDictionaryService
{
    private readonly IMerriamDictionaryClient _client;
    private readonly IDictionaryParser _parser;

   // private readonly IMemoryCache _cache;

    public async Task<WordEntry> GetWordAsync(
        string word,
        CancellationToken cancellationToken)
    {

        // var cacheKey = $"mw_{word.ToLowerInvariant()}";
        //  if (_cache.TryGetValue(cacheKey, out ParseResult cached))
        //     return cached;

        var response =
            await _client.GetAsync(word, cancellationToken);

        return _parser.Parse(response);
    }
}