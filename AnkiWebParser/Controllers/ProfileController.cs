using Application.Features.SettingsUser.GetProfile;
 
using Microsoft.AspNetCore.Mvc;

namespace AnkiWebParser.Controllers;

[ApiController]
[Route("api/profile")]
public sealed class ProfileController : ControllerBase
{
    private readonly GetProfileHandler _getProfileHandler;
    private readonly UpdateProfileHandler _updateProfileHandler;

    public ProfileController(
        GetProfileHandler getProfileHandler,
        UpdateProfileHandler updateProfileHandler)
    {
        _getProfileHandler = getProfileHandler;
        _updateProfileHandler = updateProfileHandler;
    }

    [HttpGet("{profileId:guid}")]
    public async Task<ActionResult<Profile>> Get(
        Guid profileId,
        CancellationToken cancellationToken)
    {
        try
        {
            var profile = await _getProfileHandler.HandleAsync(
                new GetProfileQuery(profileId),
                cancellationToken);

            return Ok(profile);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPut("{profileId:guid}")]
    public async Task<ActionResult<Profile>> Update(
        Guid profileId,
        [FromBody] UpdateProfileCommand command,
        CancellationToken cancellationToken)
    {
        var profile = await _updateProfileHandler.Handle(
            profileId,
            command,
            cancellationToken);

        return Ok(profile);
    }
}