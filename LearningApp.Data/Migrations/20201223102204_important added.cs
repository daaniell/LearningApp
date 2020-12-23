using Microsoft.EntityFrameworkCore.Migrations;

namespace LearningApp.Data.Migrations
{
    public partial class importantadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isCompleted",
                table: "Items",
                newName: "IsCompleted");

            migrationBuilder.AddColumn<bool>(
                name: "Important",
                table: "Items",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Important",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Items",
                newName: "isCompleted");
        }
    }
}
