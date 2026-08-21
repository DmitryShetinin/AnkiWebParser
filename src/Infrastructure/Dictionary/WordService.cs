using Application.Abstractions;
using Core.Models;
using Infrastructure.Dictionary.Merriam;
using  Core.Extensions; 


public sealed class WordService(
    IDictionaryClient dictionaryClient,
    IDictionaryParser dictionaryParser) : IWordService
{
    public async Task<IReadOnlyList<Card>> GetCardsAsync(
        string word,
        CancellationToken cancellationToken)
    {
        var response =
            await dictionaryClient.GetAsync(
                word,
                cancellationToken);

        var wordEntry =
            dictionaryParser.Parse(response);

        return wordEntry.ToCards();
    }
}