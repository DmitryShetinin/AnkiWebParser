using Application.Abstractions;
namespace Application.Features.Auth.Login;
public sealed class LoginHandler
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtService _jwtService;
    public LoginHandler(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        IJwtService jwtService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtService = jwtService;
    }
    public async Task<LoginResponse> Handle(
        LoginCommand command,
        CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmailAsync(
            command.Email,
            cancellationToken);
        if (user is null)
        {
            throw new UnauthorizedAccessException(
                "Invalid email or password.");
        }
        var passwordValid = _passwordHasher.Verify(
            command.Password,
            user.PasswordHash);
        if (!passwordValid)
        {
            throw new UnauthorizedAccessException(
                "Invalid email or password.");
        }
        return _jwtService.CreateToken(user);
    }
}