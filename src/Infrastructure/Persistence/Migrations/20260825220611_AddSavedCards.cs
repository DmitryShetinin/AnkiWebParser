using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSavedCards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedCards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExternalId = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Word = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PartOfSpeech = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Definition = table.Column<string>(type: "text", nullable: false),
                    Examples = table.Column<List<string>>(type: "text[]", nullable: false),
                    Synonyms = table.Column<List<string>>(type: "text[]", nullable: false),
                    Antonyms = table.Column<List<string>>(type: "text[]", nullable: false),
                    RelatedWords = table.Column<List<string>>(type: "text[]", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedCards", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedCards_UserId_ExternalId",
                table: "SavedCards",
                columns: new[] { "UserId", "ExternalId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedCards");
        }
    }
}
