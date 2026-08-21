


using Core.Models;

public interface IWordService
{
    Task<IReadOnlyList<Card>> GetCardsAsync(
        string word,
        CancellationToken cancellationToken);
}


