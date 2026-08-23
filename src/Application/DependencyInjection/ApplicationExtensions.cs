

using Application.Dictionary.Merriam;
using Application.Features.SettingsUser.GetProfile;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace AnkiIntegration;

public static class ApplicationExtensions
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
 
        
        services.AddScoped<GetProfileHandler>();
        services.AddScoped<UpdateProfileHandler>();

   

        return services;
    }
}