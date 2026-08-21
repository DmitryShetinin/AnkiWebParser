using Microsoft.Extensions.Caching.Memory;
using Application.Dictionary.Merriam;
using Application.Abstractions;
using Core.Extensions;
using Core.Models;

public sealed class WordService(
    IMerriamDictionaryClient dictionaryClient,
    IDictionaryParser dictionaryParser,
    IAnkiCardImporter ankiCardImporter,
    IMemoryCache cache) : IWordService
{
    public async Task<IReadOnlyList<Card>> GetCardsAsync(
        string word,
        CancellationToken cancellationToken)
    {
        var normalizedWord = word.Trim().ToLowerInvariant();
        var cacheKey = $"dictionary:int_thes:{normalizedWord}";

        if (!cache.TryGetValue(cacheKey, out WordEntry? wordEntry))
        {
            var response = await dictionaryClient.GetAsync(
                normalizedWord,
                cancellationToken);

            wordEntry = dictionaryParser.Parse(response);

            cache.Set(
                cacheKey,
                wordEntry,
                TimeSpan.FromHours(24));
        }

        var cards = wordEntry.ToCards();

        await ankiCardImporter.ImportAsync(
            cards,
            cancellationToken);

        return cards;
    }
}