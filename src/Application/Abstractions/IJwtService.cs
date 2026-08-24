using Application.Features.Auth.Login;
using Core.Models.User;

namespace Application.Abstractions;
public interface IJwtService
{
    LoginResponse CreateToken(User user);
}