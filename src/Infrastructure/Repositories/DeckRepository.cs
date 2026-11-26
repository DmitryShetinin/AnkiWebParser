using Application.Abstractions;
using Core.Models;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public sealed class DeckRepository(AppDbContext dbContext) : IDeckRepository
{
    public async Task<IReadOnlyList<Deck>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default) =>
        await dbContext.Decks
            .Where(deck => deck.UserId == userId)
            .Include(deck => deck.Cards)
                .ThenInclude(membership => membership.SavedCard)
            .OrderBy(deck => deck.Name)
            .ToListAsync(cancellationToken);

    public Task<Deck?> GetByNameAsync(Guid userId, string name, CancellationToken cancellationToken = default) =>
        dbContext.Decks
            .Include(deck => deck.Cards)
            .FirstOrDefaultAsync(deck => deck.UserId == userId && deck.Name == name, cancellationToken);

    public Task AddAsync(Deck deck, CancellationToken cancellationToken = default) =>
        dbContext.Decks.AddAsync(deck, cancellationToken).AsTask();
}
