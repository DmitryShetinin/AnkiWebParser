using System.Text.Json;
using System.Text.Json.Serialization;
namespace Application.Merriam;

public sealed class MerriamEntryDto
{
    public required MerriamMetaDto Meta { get; init; }

    public required MerriamHeadwordDto Hwi { get; init; }

    public required string Fl { get; init; }

    public IReadOnlyList<MerriamDefinitionBlockDto> Def { get; init; } = [];
}

public sealed class MerriamMetaDto
{
    public required string Id { get; init; }

    public required Guid Uuid { get; init; }

    public required string Src { get; init; }

    public MerriamTargetDto? Target { get; init; }

    public IReadOnlyList<string> Stems { get; init; } = [];
}

public sealed class MerriamTargetDto
{
    public required Guid Tuuid { get; init; }

    public required string Tsrc { get; init; }
}

public sealed class MerriamHeadwordDto
{
    public required string Hw { get; init; }
}

public sealed class MerriamDefinitionBlockDto
{
    public JsonElement Sseq { get; init; }
}

public sealed class MerriamSenseDto
{
    [JsonPropertyName("sn")]
    public string? SenseNumber { get; init; }

    [JsonPropertyName("dt")]
    public JsonElement Dt { get; init; }
}

public sealed class MerriamDefinitionDto
{
    [JsonPropertyName("sseq")]
    public JsonElement Sseq { get; init; }

    [JsonPropertyName("shortdef")]
    public IReadOnlyList<string> ShortDefinitions { get; init; } = [];
}