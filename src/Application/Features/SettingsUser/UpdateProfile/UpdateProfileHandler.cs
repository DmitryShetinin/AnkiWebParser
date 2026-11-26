

using Application.Abstractions;

public sealed class UpdateProfileHandler
{
    private readonly IProfileRepository _repository;

    public UpdateProfileHandler(
        IProfileRepository repository)
    {
        _repository = repository;
    }

   public async Task<Profile> Handle(
    Guid profileId,
    UpdateProfileCommand command,
    CancellationToken cancellationToken = default)
{
    var profile = await _repository.GetByIdAsync(
        profileId,
        cancellationToken);

    if (profile is null)
    {
        profile = Profile.Create(profileId);
      
        ApplySettings(profile, command);

        await _repository.AddAsync(
            profile,
            cancellationToken);
    }
    else
    {
        ApplySettings(profile, command);
    }

     await _repository.UpdateAsync(
            profile,
            cancellationToken);

    return profile;
}

    private static void ApplySettings(
    Profile profile,
    UpdateProfileCommand command)
    {
       
        profile.Account.Avatar = command.Avatar;

        profile.Dictionary.MaxSynonyms = command.MaxSynonyms;
        profile.Dictionary.MaxAntonyms = command.MaxAntonyms;
        profile.Dictionary.MaxRelatedWords = command.MaxRelatedWords;
        profile.Dictionary.MaxExamples = command.MaxExamples;
 

        profile.Appearance.CardStyle = command.CardStyle;
        profile.Appearance.Theme = command.Theme;
    }
}