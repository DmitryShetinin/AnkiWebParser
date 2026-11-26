using System.Security.Claims;
using Application.Features.Collection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnkiWebParser.Controllers;

[ApiController]
[Authorize]
[Route("api/collection")]
public sealed class CollectionController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<CollectionCardDto>>> Get(
        [FromServices] GetCollectionHandler handler,
        CancellationToken cancellationToken) =>
        Ok(await handler.HandleAsync(GetUserId(), cancellationToken));

    [HttpPost("import")]
    public async Task<ActionResult<object>> Import(
        [FromBody] IReadOnlyList<CollectionCardDto> cards,
        [FromServices] ImportCollectionHandler handler,
        CancellationToken cancellationToken)
    {
        var importedCount = await handler.HandleAsync(GetUserId(), cards, cancellationToken);
        return Ok(new { importedCount });
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(userIdClaim, out var userId) ? userId : throw new UnauthorizedAccessException();
    }
}
