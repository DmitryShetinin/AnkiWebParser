using AnkiIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.DependencyInjection;

public static class DependencyInjection
{
  public static IServiceCollection AddInfrastructure(
      this IServiceCollection services,
      IConfiguration configuration)
  {
    services.AddRepositories()
            .AddDictionary(configuration)
            .AddAnki(configuration)
            .AddPersistence(configuration);



    return services;


  }
}
