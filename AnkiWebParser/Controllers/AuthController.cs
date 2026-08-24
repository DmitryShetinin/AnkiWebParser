using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Application.Features.Auth.Login;
using Application.Features.Auth.Me;
using Application.Features.Auth.Register;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnkiWebParser.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<Guid>> Register(
        [FromBody] RegisterCommand command,
        [FromServices] RegisterHandler handler,
        CancellationToken cancellationToken)
    {
        var userId = await handler.Handle(command, cancellationToken);

        return Ok(userId);
    }


    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(
    [FromBody] LoginCommand command,
    [FromServices] LoginHandler handler,
    CancellationToken cancellationToken)
    {
        var response = await handler.Handle(
            command,
            cancellationToken);
        return Ok(response);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<GetCurrentUserResponse>> Me(
    [FromServices] GetCurrentUserHandler handler,
    CancellationToken cancellationToken)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        var response = await handler.Handle(
            userId,
            cancellationToken);
        return Ok(response);
    }
}