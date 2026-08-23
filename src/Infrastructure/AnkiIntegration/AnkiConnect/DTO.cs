


using System.Text.Json.Serialization;

public sealed class AnkiResponse<T>
{
    [JsonPropertyName("result")]
    public T? Result { get; init; }

    [JsonPropertyName("error")]
    public string? Error { get; init; }


    public bool Success => Error is null;
}



public sealed class AnkiNoteDto
{
    [JsonPropertyName("deckName")]
    public required string DeckName { get; init; }

    [JsonPropertyName("modelName")]
    public required string ModelName { get; init; }

    [JsonPropertyName("fields")]
    public required Dictionary<string, string> Fields { get; init; }

    [JsonPropertyName("tags")]
    public IReadOnlyList<string> Tags { get; init; } = [];

   
}


