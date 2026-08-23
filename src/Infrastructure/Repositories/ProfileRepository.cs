using Application.Abstractions;

using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public sealed class ProfileRepository : IProfileRepository
{
    private readonly AppDbContext _dbContext;

    public ProfileRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Profile?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Profiles
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken);
    }

    public async Task AddAsync(
        Profile profile,
        CancellationToken cancellationToken = default)
    {
        await _dbContext.Profiles.AddAsync(
            profile,
            cancellationToken);
    }

    public async Task UpdateAsync(
       Profile profile,
       CancellationToken cancellationToken = default)
    {
        _dbContext.Profiles.Update(profile);

        await _dbContext.SaveChangesAsync(
            cancellationToken);
    }

    public async Task<Profile?> GetAsync(
    Guid profileId,
    CancellationToken cancellationToken = default)
    {
        return await _dbContext.Profiles
            .FirstOrDefaultAsync(
                profile => profile.Id == profileId,
                cancellationToken);
    }
}