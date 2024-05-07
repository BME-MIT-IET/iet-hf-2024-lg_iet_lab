using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Gombahaz.Migrations
{
    /// <inheritdoc />
    public partial class addresourcedata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Resource",
                columns: new[] { "Id", "Address", "Comment", "Description", "Name", "Size" },
                values: new object[,]
                {
                    { 2, "2222 Debrecen Kossuth utca 20.", "Ideális környezet a gombák fejlődéséhez.", "Különböző gombafajták termesztésére alkalmas.", "GombaFalu gazdaság", "120x25x8m" },
                    { 3, "3333 Szeged Ady Endre út 5.", "A legfrissebb technológiákat alkalmazzák a termesztés során.", "Kizárólag biogombák termesztésére specializálódott.", "Zöld Kapu GombaFarm", "100x20x6m" },
                    { 4, "4444 Pécs Széchenyi tér 10.", "A legmagasabb minőséget garantálják.", "Kis- és nagykereskedelmi gombaellátást biztosít.", "GombaPalota Kertészete", "80x15x5m" },
                    { 5, "5555 Győr Árpád út 3.", "Modern és hatékony termesztési módszereket alkalmaznak.", "Többféle gombafajta termesztésére szakosodott.", "Gombavilág Gazdasági Komplexum", "130x25x7m" },
                    { 6, "6666 Szombathely Bajcsy-Zsilinszky út 15.", "Környezetbarát termelési folyamatokat alkalmaznak.", "Főként shiitake és laskagomba termesztésére fókuszálnak.", "GombaBirodalom Termelőház", "110x20x6m" },
                    { 7, "7777 Nyíregyháza Szent István út 30.", "Nemzetközi minősítésű termékekkel rendelkeznek.", "A legújabb gomba termesztési technológiákat használják.", "Gombasziget Gombatelep", "140x30x8m" },
                    { 8, "8888 Miskolc Bartók Béla út 5.", "A legtisztább környezetben termelik gombáikat.", "Kizárólag organikus gombák termesztésével foglalkoznak.", "Boróka GombaFarm", "100x18x6m" },
                    { 9, "9999 Kecskemét Arany János út 2.", "Az üvegház kiváló növekedési környezetet biztosít.", "Magas minőségű csiperkegombák termesztésére specializálódtak.", "GombaGazda Üvegháza", "90x16x5m" },
                    { 10, "1010 Székesfehérvár Petőfi Sándor út 7.", "A helyi piacokon nagy népszerűségnek örvendenek.", "Különleges ízű és formájú gombák termesztésére specializálódtak.", "Zöldfülű Gombatermesztő Kert", "120x22x7m" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Resource",
                keyColumn: "Id",
                keyValue: 10);
        }
    }
}
