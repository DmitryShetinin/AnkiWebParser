using System.ComponentModel.Design;
using Application;
using Application.Abstractions;
using Application.Dictionary.Merriam;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class DictionaryExtensions
{
    public static IServiceCollection AddDictionary(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddOptions<DictionaryOptions>()
            .Bind(configuration.GetSection("Dictionary"));

        services.AddHttpClient<
            IMerriamDictionaryClient,
            MerriamDictionaryClient>();

        services.AddScoped<
            IMerriamTextFormatter,
            MerriamTextFormatter>();

        services.AddScoped<
            IDictionaryParser,
            MerriamParser>();

        services.AddScoped<
            IMerriamDictionaryService,
            MerriamDictionaryService>();

        services.AddScoped<
            IWordService,
            WordService>();

        return services;
    }
}