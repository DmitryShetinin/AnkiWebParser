

public sealed record UpdateProfileCommand(
 
    string Username,
    string Email,
    string? Avatar,

    int MaxSynonyms,
    int MaxAntonyms,
    int MaxRelatedWords,
    int MaxExamples,

    string DeckName,
    string ModelName,
    bool AutoCreateDeck,

    int CardStyle,
    string Theme);

