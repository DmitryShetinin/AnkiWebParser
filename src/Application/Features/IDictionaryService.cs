


using Core.Models;

public interface IDictionaryService
{
    Task<WordEntry> GetWordAsync(
        string word,
        CancellationToken cancellationToken);
}
