using Core.Models.User;

public sealed class Profile
{
    public Guid Id { get; init; }

    public Guid UserId { get; set; }

    public AccountSettings Account { get; set; } = new();
    public DictionarySettings Dictionary { get; set; } = new();
    public AppearanceSettings Appearance { get; set; } = new();

    public User User { get; set; } = null!;



    private Profile()
    {
    }

    public static Profile Create(Guid userId)
    {
        return new Profile
        {
            Id = Guid.NewGuid(),
            UserId = userId
        };
    }
}