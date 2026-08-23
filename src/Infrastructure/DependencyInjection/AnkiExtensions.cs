using AnkiIntegration.AnkiConnect;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnkiIntegration;

public static class AnkiExtensions
{
    public static IServiceCollection AddAnki(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddOptions<AnkiOptions>()
            .Bind(configuration.GetSection("Anki"));
            

        services.AddHttpClient<IAnkiConnectClient, AnkiConnectClient>(client =>
        {
            client.BaseAddress = new Uri("http://127.0.0.1:8765/");
        });

        services.AddScoped<IAnkiCardImporter, AnkiCardImporter>();
        services.AddScoped<AnkiCardMapper>();
        services.AddScoped<AnkiOptions>();
        services.AddSingleton<IAnkiModelInitializer, AnkiModelInitializer>();
        return services;
    }
}