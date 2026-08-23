

using Application.Abstractions;
 

namespace Application.Features.SettingsUser.GetProfile;

public sealed class GetProfileHandler
{
    private readonly IProfileRepository _profileRepository;

    public GetProfileHandler(
        IProfileRepository profileRepository)
    {
        _profileRepository = profileRepository;
    }

    public async Task<Profile> HandleAsync(
        GetProfileQuery query,
        CancellationToken cancellationToken = default)
    {
        var profile = await _profileRepository.GetByIdAsync(
            query.ProfileId,
            cancellationToken);

        if (profile is null)
        {
            throw new KeyNotFoundException(
                $"Profile '{query.ProfileId}' was not found.");
        }

        return profile;
    }
}
