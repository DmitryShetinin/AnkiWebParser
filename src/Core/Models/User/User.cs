namespace Core.Models.User;

public sealed class User
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

      public Profile Profile { get; private set; } = null!;
    public ICollection<Core.Models.Deck> Decks { get; private set; } = new List<Core.Models.Deck>();
    public ICollection<Core.Models.Collection.SavedCard> SavedCards { get; private set; } = new List<Core.Models.Collection.SavedCard>();

    private User()
    {
    }

    public static User Create(
        string username,
        string email,
        string passwordHash)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = username,
            Email = email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        user.Profile = Profile.Create(user.Id);

        return user;
    }
}
