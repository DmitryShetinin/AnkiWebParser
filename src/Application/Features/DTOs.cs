using System.Text.Json;
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