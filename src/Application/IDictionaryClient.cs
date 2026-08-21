



using Application.Merriam;

namespace Infrastructure.Dictionary.Merriam;


public interface IDictionaryClient
{
    Task<IReadOnlyList<MerriamEntryDto>> GetAsync(
        string word,
        CancellationToken cancellationToken);
}