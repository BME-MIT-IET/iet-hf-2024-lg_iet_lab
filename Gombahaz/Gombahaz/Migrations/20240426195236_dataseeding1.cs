using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gombahaz.Migrations
{
    /// <inheritdoc />
    public partial class dataseeding1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Resource",
                columns: new[] { "Id", "Address", "Comment", "Description", "Name", "Size" },
                values: new object[] { 1, "1111 Budapest József Attila utca 151.", "Minden műszer megfelelően működik.", "Csiperkegomba termesztésre használják.", "Csiperke1 termesztőház", "150x30x10m" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
