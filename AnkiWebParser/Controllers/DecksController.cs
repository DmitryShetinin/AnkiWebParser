using System.Security.Claims;
using Application.Features.Collection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnkiWebParser.Controllers;

[ApiController]
[Authorize]
[Route("api/decks")]
public sealed class DecksController(GetDecksHandler handler) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DeckDto>>> Get(CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        return Ok(await handler.HandleAsync(userId, cancellationToken));
    }
}
