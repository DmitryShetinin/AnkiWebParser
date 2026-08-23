public interface IProfileRepository
{
    Task<Profile?> GetAsync(
        Guid profileId,
        CancellationToken cancellationToken = default);

    Task AddAsync(
        Profile profile,
        CancellationToken cancellationToken = default);

    Task UpdateAsync(
        Profile profile,
        CancellationToken cancellationToken = default);

         Task<Profile?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);
        
}