namespace Application.Features.Auth.Login;
public sealed record LoginResponse(
    string AccessToken,
    DateTime ExpiresAt);