



using Application.Merriam;

namespace Application.Dictionary.Merriam;


public interface IMerriamDictionaryClient
{
    Task<IReadOnlyList<MerriamEntryDto>> GetAsync(
        string word,
        CancellationToken cancellationToken);
}