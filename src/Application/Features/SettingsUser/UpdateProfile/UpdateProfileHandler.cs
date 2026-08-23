

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
        profile = new Profile
        {
            Id = profileId
        };

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
        profile.Account.Username = command.Username;
        profile.Account.Email = command.Email;
        profile.Account.Avatar = command.Avatar;

        profile.Dictionary.MaxSynonyms = command.MaxSynonyms;
        profile.Dictionary.MaxAntonyms = command.MaxAntonyms;
        profile.Dictionary.MaxRelatedWords = command.MaxRelatedWords;
        profile.Dictionary.MaxExamples = command.MaxExamples;

        profile.Anki.DeckName = command.DeckName;
        profile.Anki.ModelName = command.ModelName;
        profile.Anki.AutoCreateDeck = command.AutoCreateDeck;

        profile.Appearance.CardStyle = command.CardStyle;
        profile.Appearance.Theme = command.Theme;
    }
}