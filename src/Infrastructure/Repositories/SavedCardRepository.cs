using Application.Abstractions;
using Core.Models.Collection;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public sealed class SavedCardRepository(AppDbContext dbContext) : ISavedCardRepository
{
    public async Task<IReadOnlyList<SavedCard>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default) =>
        await dbContext.SavedCards.Where(card => card.UserId == userId).OrderByDescending(card => card.CreatedAt).ToListAsync(cancellationToken);

    public async Task<IReadOnlySet<string>> GetExternalIdsAsync(Guid userId, IEnumerable<string> externalIds, CancellationToken cancellationToken = default)
    {
        var ids = externalIds.Distinct().ToList();
        return await dbContext.SavedCards.Where(card => card.UserId == userId && ids.Contains(card.ExternalId))
            .Select(card => card.ExternalId).ToHashSetAsync(cancellationToken);
    }

    public async Task AddRangeAsync(IEnumerable<SavedCard> cards, CancellationToken cancellationToken = default) =>
        await dbContext.SavedCards.AddRangeAsync(cards, cancellationToken);
}
