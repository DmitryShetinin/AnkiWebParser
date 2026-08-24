using Application.Abstractions;
 
using Core.Models.User;

namespace Application.Features.Auth.Register;

public sealed class RegisterHandler
{
    private readonly IUserRepository _userRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterHandler(
        IUserRepository userRepository,
        IProfileRepository profileRepository,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _profileRepository = profileRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Guid> Handle(
        RegisterCommand command,
        CancellationToken cancellationToken)
    {
        if (await _userRepository.ExistsByEmailAsync(
                command.Email,
                cancellationToken))
        {
            throw new InvalidOperationException("Email already exists.");
        }

        if (await _userRepository.ExistsByUsernameAsync(
                command.Username,
                cancellationToken))
        {
            throw new InvalidOperationException("Username already exists.");
        }

        var userId = Guid.NewGuid();

        var user = new User
        {
            Id = userId,
            Username = command.Username,
            Email = command.Email,
            PasswordHash = _passwordHasher.Hash(command.Password)
        };

        var profile = new Profile
        {
            Id = userId
        };

        await _userRepository.AddAsync(
            user,
            cancellationToken);

        await _profileRepository.AddAsync(
            profile,
            cancellationToken);

        await _userRepository.SaveChangesAsync(
            cancellationToken);

        return userId;
    }
}