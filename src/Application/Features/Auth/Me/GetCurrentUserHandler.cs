using Application.Abstractions;
namespace Application.Features.Auth.Me;
public sealed class GetCurrentUserHandler
{
    private readonly IUserRepository _userRepository;
    public GetCurrentUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<GetCurrentUserResponse> Handle(
        Guid userId,
        CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(
            userId,
            cancellationToken);
        if (user is null)
        {
            throw new UnauthorizedAccessException();
        }
        return new GetCurrentUserResponse(
            user.Id,
            user.Username,
            user.Email);
    }
}