using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LearningApp.Data.Migrations
{
    public partial class deletemodifyDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiteDate",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Items",
                newName: "isCompleted");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isCompleted",
                table: "Items",
                newName: "IsCompleted");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiteDate",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
