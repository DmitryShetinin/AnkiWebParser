using Application.Abstractions;

namespace Application.Features.Collection;

public sealed class GetCollectionHandler(ISavedCardRepository repository)
{
    public async Task<IReadOnlyList<CollectionCardDto>> HandleAsync(Guid userId, CancellationToken cancellationToken)
    {
        var cards = await repository.GetByUserIdAsync(userId, cancellationToken);
        return cards.Select(card => new CollectionCardDto(card.ExternalId, card.Word, card.PartOfSpeech, card.Definition,
            card.Examples, card.Synonyms, card.Antonyms, card.RelatedWords)).ToList();
    }
}
