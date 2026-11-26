

using Application.Dictionary.Merriam;
using Application.Features.Auth.Login;
using Application.Features.Auth.Me;
using Application.Features.Auth.Register;
using Application.Features.SettingsUser.GetProfile;
using Application.Features.Collection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace AnkiIntegration;

public static class ApplicationExtensions
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
 
        
        services.AddScoped<RegisterHandler>();
        services.AddScoped<GetProfileHandler>();
        services.AddScoped<UpdateProfileHandler>();
        services.AddScoped<LoginHandler>();

        services.AddScoped<GetCurrentUserHandler>();
        services.AddScoped<GetCollectionHandler>();
        services.AddScoped<ImportCollectionHandler>();
        services.AddScoped<DictionarySettings>();

   

        return services;
    }
}
