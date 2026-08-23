

using AnkiIntegration;
using Infrastructure.DependencyInjection;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi()
                .AddInfrastructure(builder.Configuration)
                .AddApplication();


builder.Services.AddControllers(); 


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

await app.Services
    .GetRequiredService<IAnkiModelInitializer>()
    .InitializeAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();


app.Run();
