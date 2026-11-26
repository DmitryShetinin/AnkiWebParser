using Core.Models.Collection;

namespace Core.Models;

/// <summary>A user's named collection of saved vocabulary cards.</summary>
public sealed class Deck
{
    private readonly List<DeckCard> _cards = [];

    private Deck() { }

    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    public Core.Models.User.User User { get; private set; } = null!;
    public IReadOnlyCollection<DeckCard> Cards => _cards.AsReadOnly();

    public static Deck Create(Guid userId, string name, string? description = null)
    {
        if (userId == Guid.Empty)
            throw new ArgumentException("A deck must belong to a user.", nameof(userId));

        var now = DateTime.UtcNow;
        return new Deck
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = NormalizeName(name),
            Description = NormalizeDescription(description),
            CreatedAt = now,
            UpdatedAt = now
        };
    }

    public void Rename(string name, string? description = null)
    {
        Name = NormalizeName(name);
        Description = NormalizeDescription(description);
        UpdatedAt = DateTime.UtcNow;
    }

    public DeckCard AddCard(SavedCard card)
    {
        ArgumentNullException.ThrowIfNull(card);
        if (card.UserId != UserId)
            throw new InvalidOperationException("A deck can only contain cards owned by the same user.");
        if (_cards.Any(item => item.SavedCardId == card.Id))
            throw new InvalidOperationException("This card is already in the deck.");

        var membership = DeckCard.Create(this, card);
        _cards.Add(membership);
        UpdatedAt = DateTime.UtcNow;
        return membership;
    }

    public void RemoveCard(Guid savedCardId)
    {
        var membership = _cards.FirstOrDefault(item => item.SavedCardId == savedCardId);
        if (membership is null)
            return;

        _cards.Remove(membership);
        UpdatedAt = DateTime.UtcNow;
    }

    private static string NormalizeName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("A deck name is required.", nameof(name));

        var normalized = name.Trim();
        if (normalized.Length > 120)
            throw new ArgumentOutOfRangeException(nameof(name), "A deck name cannot exceed 120 characters.");

        return normalized;
    }

    private static string? NormalizeDescription(string? description)
    {
        if (string.IsNullOrWhiteSpace(description))
            return null;

        var normalized = description.Trim();
        if (normalized.Length > 500)
            throw new ArgumentOutOfRangeException(nameof(description), "A deck description cannot exceed 500 characters.");

        return normalized;
    }
}
