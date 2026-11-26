using Core.Models.Collection;

namespace Application.Abstractions;

public interface ISavedCardRepository
{
    Task<IReadOnlyList<SavedCard>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IReadOnlySet<string>> GetExternalIdsAsync(Guid userId, IEnumerable<string> externalIds, CancellationToken cancellationToken = default);
    Task AddRangeAsync(IEnumerable<SavedCard> cards, CancellationToken cancellationToken = default);
}
