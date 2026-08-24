namespace Application.Features.Auth.Me;
public sealed record GetCurrentUserResponse(
    Guid Id,
    string Username,
    string Email);