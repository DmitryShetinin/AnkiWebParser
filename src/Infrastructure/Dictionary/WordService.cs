using Application.Abstractions;
using Core.Models;
 
using  Core.Extensions;
using AnkiIntegration.AnkiConnect;
using Application.Dictionary.Merriam;


public sealed class WordService(
    IDictionaryClient dictionaryClient,
    IDictionaryParser dictionaryParser,
    IAnkiConnectClient ankiConnectClient) : IWordService
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