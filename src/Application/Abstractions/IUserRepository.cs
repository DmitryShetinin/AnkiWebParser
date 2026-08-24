using Core.Models.User;

namespace Application.Abstractions;

public interface IUserRepository
{
    Task<bool> ExistsByEmailAsync(
        string email,
        CancellationToken cancellationToken = default);

    Task<bool> ExistsByUsernameAsync(
        string username,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        User user,
        CancellationToken cancellationToken = default);

    Task SaveChangesAsync(
        CancellationToken cancellationToken = default);

    Task<User?> GetByEmailAsync(
    string email,
    CancellationToken cancellationToken = default);

    Task<User?> GetByIdAsync(
    Guid id,
    CancellationToken cancellationToken = default);
}