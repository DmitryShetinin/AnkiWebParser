namespace Application.Features.Collection;

public sealed record CollectionCardDto(string ExternalId, string Word, string PartOfSpeech, string Definition,
    IReadOnlyList<string> Examples, IReadOnlyList<string> Synonyms, IReadOnlyList<string> Antonyms, IReadOnlyList<string> RelatedWords);
