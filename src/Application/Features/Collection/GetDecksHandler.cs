using Application.Abstractions;

namespace Application.Features.Collection;

public sealed class GetDecksHandler(IDeckRepository repository)
{
    public async Task<IReadOnlyList<DeckDto>> HandleAsync(Guid userId, CancellationToken cancellationToken)
    {
        var decks = await repository.GetByUserIdAsync(userId, cancellationToken);
        return decks.Select(deck => new DeckDto(
            deck.Id,
            deck.Name,
            deck.Description,
            deck.Cards.Select(membership => new DeckCardDto(
                membership.SavedCard.ExternalId,
                membership.SavedCard.ExternalId,
                membership.SavedCard.Word,
                membership.SavedCard.PartOfSpeech,
                membership.SavedCard.Definition,
                membership.SavedCard.Examples,
                membership.SavedCard.Synonyms,
                membership.SavedCard.Antonyms,
                membership.SavedCard.RelatedWords)).ToList())).ToList();
    }
}
