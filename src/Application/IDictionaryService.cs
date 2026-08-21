using Core.Models;

namespace Application;


public interface IMerriamDictionaryService
{
    Task<WordEntry> GetWordAsync(
        string word,
        CancellationToken cancellationToken);
}
