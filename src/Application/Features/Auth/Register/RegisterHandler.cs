using Application.Abstractions;

using Core.Models.User;

namespace Application.Features.Auth.Register;

public sealed class RegisterHandler
{
    private readonly IUserRepository _userRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher _passwordHasher;

    public RegisterHandler(
        IUserRepository userRepository,
        IProfileRepository profileRepository,
        IUnitOfWork unitOfWork,
        IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _profileRepository = profileRepository;
        _unitOfWork = unitOfWork;
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

        var passwordHash = _passwordHasher.Hash(command.Password);

        var user = User.Create(
            command.Username,
            command.Email,
            passwordHash);


        await _userRepository.AddAsync(
            user,
            cancellationToken);

        await _profileRepository.AddAsync(
            user.Profile,
            cancellationToken);

        await _unitOfWork.SaveChangesAsync(
            cancellationToken);

        return user.Id;
    }
}