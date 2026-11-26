using Application.Abstractions;
using Core.Models.Collection;
using Core.Models;

namespace Application.Features.Collection;

public sealed class ImportCollectionHandler(
    ISavedCardRepository repository,
    IDeckRepository deckRepository,
    IUnitOfWork unitOfWork)
{
    public async Task<int> HandleAsync(Guid userId, IReadOnlyList<CollectionCardDto> cards, CancellationToken cancellationToken)
    {
        var uniqueCards = cards.Where(card => !string.IsNullOrWhiteSpace(card.ExternalId) && !string.IsNullOrWhiteSpace(card.Word))
            .GroupBy(card => card.ExternalId).Select(group => group.First()).ToList();
        var existingIds = await repository.GetExternalIdsAsync(userId, uniqueCards.Select(card => card.ExternalId), cancellationToken);
        var cardsToAdd = uniqueCards.Where(card => !existingIds.Contains(card.ExternalId))
            .Select(card => SavedCard.Create(userId, card.ExternalId, card.Word, card.PartOfSpeech, card.Definition,
                card.Examples, card.Synonyms, card.Antonyms, card.RelatedWords)).ToList();

        if (cardsToAdd.Count == 0) return 0;

        const string defaultDeckName = "My vocabulary";
        var deck = await deckRepository.GetByNameAsync(userId, defaultDeckName, cancellationToken);
        if (deck is null)
        {
            deck = Deck.Create(userId, defaultDeckName);
            await deckRepository.AddAsync(deck, cancellationToken);
        }

        foreach (var card in cardsToAdd)
            deck.AddCard(card);

        await repository.AddRangeAsync(cardsToAdd, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return cardsToAdd.Count;
    }
}
