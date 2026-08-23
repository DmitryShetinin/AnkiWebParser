using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Account_Username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Account_Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Account_Avatar = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Dictionary_MaxSynonyms = table.Column<int>(type: "integer", nullable: false),
                    Dictionary_MaxAntonyms = table.Column<int>(type: "integer", nullable: false),
                    Dictionary_MaxRelatedWords = table.Column<int>(type: "integer", nullable: false),
                    Dictionary_MaxExamples = table.Column<int>(type: "integer", nullable: false),
                    Anki_DeckName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Anki_ModelName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Anki_AutoCreateDeck = table.Column<bool>(type: "boolean", nullable: false),
                    Appearance_CardStyle = table.Column<int>(type: "integer", nullable: false),
                    Appearance_Theme = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Profiles");
        }
    }
}
