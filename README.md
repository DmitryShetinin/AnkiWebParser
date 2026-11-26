# AnkiWebParser

## Domain model

- `User` owns one `Profile`, which stores account, dictionary, and appearance preferences.
- `User` owns saved dictionary cards and named decks.
- A `SavedCard` is a snapshot of one Merriam-Webster sense, including its definition, examples, synonyms, antonyms, and related words.
- `DeckCard` places a saved card into a deck. The database uses composite foreign keys containing `UserId`, so a user's deck cannot contain another user's card.
- `WordEntry`, `PartOfSpeechEntry`, and `Meaning` represent parsed dictionary results before the user saves a card.

PostgreSQL stores users, profiles, saved cards, decks, and deck memberships. Profile preferences are owned columns on `Profiles`; word lists are PostgreSQL `text[]` columns on `SavedCards`.

## Create or update the local database

Start the PostgreSQL service from `docker-compose.yml`:

```sh
docker compose up -d postgres
```

Apply EF Core migrations. The connection string is passed through the environment so credentials do not need to be committed:

```sh
ConnectionStrings__Default='Host=localhost;Port=5432;Database=test_db;Username=postgres;Password=postgres' \
  dotnet ef database update \
  --project src/Infrastructure/Infrastructure.csproj \
  --startup-project AnkiWebParser/AnkiWebParser.csproj \
  --context AppDbContext
```

For the running API, configure the same value as the `ConnectionStrings:Default` user secret or environment variable. The design-time EF factory uses a local development fallback when the variable is not set.

In this workspace, `AnkiWebParser/appsettings.Development.local.json` is ignored by Git and points the API at the Compose database. Development startup applies pending migrations automatically. On another machine, create that ignored file with the connection string above, or set `ConnectionStrings__Default` in the environment.

Saved cards are stored in PostgreSQL for signed-in users. Signed-out guest cards remain in browser storage until the user signs in; the app then offers to import them into the account database.
