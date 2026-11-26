namespace Application.Features.Collection;

public sealed record DeckDto(
    Guid Id,
    string Name,
    string? Description,
    IReadOnlyList<DeckCardDto> Cards);

public sealed record DeckCardDto(
    string Id,
    string ExternalId,
    string Word,
    string PartOfSpeech,
    string Definition,
    IReadOnlyList<string> Examples,
    IReadOnlyList<string> Synonyms,
    IReadOnlyList<string> Antonyms,
    IReadOnlyList<string> RelatedWords);
