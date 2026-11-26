using Core.Models;

namespace Core.Models.Collection;

/// <summary>Membership of one saved card in one of its owner's decks.</summary>
public sealed class DeckCard
{
    private DeckCard() { }

    public Guid DeckId { get; private set; }
    public Guid SavedCardId { get; private set; }
    public Guid UserId { get; private set; }
    public DateTime AddedAt { get; private set; }

    public Deck Deck { get; private set; } = null!;
    public SavedCard SavedCard { get; private set; } = null!;

    internal static DeckCard Create(Deck deck, SavedCard card) => new()
    {
        DeckId = deck.Id,
        SavedCardId = card.Id,
        UserId = deck.UserId,
        AddedAt = DateTime.UtcNow
    };
}
