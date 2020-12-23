using Microsoft.EntityFrameworkCore.Migrations;

namespace LearningApp.Data.Migrations
{
    public partial class isImportantadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Important",
                table: "Items",
                newName: "IsImportant");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsImportant",
                table: "Items",
                newName: "Important");
        }
    }
}
