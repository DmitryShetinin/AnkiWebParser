using AnkiIntegration;
using Application.Abstractions;
using Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.DependencyInjection;

public static class RepositoriesExtensions
{
  public static IServiceCollection AddRepositories(
      this IServiceCollection services)
  {
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IProfileRepository, ProfileRepository>();
    services.AddScoped<ISavedCardRepository, SavedCardRepository>();


    return services;


  }
}
