using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedExistingCardsIntoDefaultDeck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                INSERT INTO "Decks" ("Id", "UserId", "Name", "Description", "CreatedAt", "UpdatedAt")
                SELECT gen_random_uuid(), existing."UserId", 'My vocabulary', NULL, now(), now()
                FROM (SELECT DISTINCT "UserId" FROM "SavedCards") AS existing
                ON CONFLICT ("UserId", "Name") DO NOTHING;

                INSERT INTO "DeckCards" ("DeckId", "SavedCardId", "UserId", "AddedAt")
                SELECT deck."Id", card."Id", card."UserId", card."CreatedAt"
                FROM "SavedCards" AS card
                JOIN "Decks" AS deck
                  ON deck."UserId" = card."UserId"
                 AND deck."Name" = 'My vocabulary'
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM "DeckCards" AS membership
                    WHERE membership."SavedCardId" = card."Id"
                )
                ON CONFLICT ("DeckId", "SavedCardId") DO NOTHING;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
