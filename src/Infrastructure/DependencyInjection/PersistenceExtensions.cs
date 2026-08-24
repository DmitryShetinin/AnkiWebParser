using Infrastructure.Configuration;
using Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Security;
using Application.Abstractions;


public static class PersistenceExtensions
{
  public static IServiceCollection AddPersistence(
      this IServiceCollection services,
      IConfiguration configuration)
  {
    services.Configure<DatabaseOptions>(
        configuration.GetSection("Database"));


    services.AddDbContextFactory<AppDbContext>(
        (sp, options) =>
        {
          var dbOptions =
                  sp.GetRequiredService<IOptions<DatabaseOptions>>()
                      .Value;


          options.UseNpgsql(
                  configuration.GetConnectionString("Default"),
                  npgsql =>
                  {
                    npgsql.CommandTimeout(
                            dbOptions.CommandTimeoutSeconds);
                  });
        });

    
  services.AddScoped<IPasswordHasher, PasswordHasher>();
  services.AddScoped<IJwtService, JwtService>();
 
    return services;
  }
}
