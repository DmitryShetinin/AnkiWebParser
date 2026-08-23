public sealed class Profile
{
    public Guid Id { get; init; }

    public AccountSettings Account { get; set; } = new();

    public DictionarySettings Dictionary { get; set; } = new();

    public AnkiSettings Anki { get; set; } = new();

    public AppearanceSettings Appearance { get; set; } = new();
}