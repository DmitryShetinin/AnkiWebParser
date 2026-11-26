using Core.Models;

namespace Application.Abstractions;

public interface IDeckRepository
{
    Task<IReadOnlyList<Deck>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<Deck?> GetByNameAsync(Guid userId, string name, CancellationToken cancellationToken = default);
    Task AddAsync(Deck deck, CancellationToken cancellationToken = default);
}
