



public interface IAnkiModelInitializer
{
    Task InitializeAsync(
        CancellationToken cancellationToken = default);
}