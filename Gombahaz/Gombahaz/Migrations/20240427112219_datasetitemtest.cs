using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gombahaz.Migrations
{
    /// <inheritdoc />
    public partial class datasetitemtest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var records = new object[50,8];

            var random = new Random();

            for (int i = 0; i < 50; i++)
            {
                records[i,0] = i + 1;
                records[i,1] = 1;
                records[i,2] = random.Next(20,35);
                records[i,3] = random.Next(71, 100);
                records[i,4] = random.NextDouble();
                records[i,5] = random.Next(1, 70);
                records[i,6] = random.Next(11, 30);
                records[i,7] = new DateTime(2024, 4, random.Next(20, 31), random.Next(0, 24), random.Next(0, 60), random.Next(0, 60), DateTimeKind.Utc);

                //records[i] = new object[0] { firstField, secondField, thirdField, fourthField, fifthField, sixthField, seventhField };
            }

            migrationBuilder.InsertData(
               table: "DataSet",
                columns: new[] { "Id", "ResourceId", "Temperature", "Humidity", "COLevel", "SoilMoisture", "SoilTemperature", "DataObserved" },
                values: records );
                //new object[,]
                //{
                //    { 1, 1, 15.0, 98.0, 0.25, 50.0, 10.0, new DateTime(2024, 4, 27, 8, 22, 11, 0, DateTimeKind.Utc)},
                //    { 2, 1, 17.3, 74.5, 0.48, 63.2, 19.8, new DateTime(2024, 7, 11, 5, 33, 49, 0, DateTimeKind.Utc)},
                //    { 3, 1, 12.8, 85.2, 0.75, 37.6, 20.5, new DateTime(2024, 8, 19, 14, 42, 20, 0, DateTimeKind.Utc)},
                //    { 4, 1, 13.6, 61.8, 0.63, 45.9, 42.1, new DateTime(2024, 2, 4, 9, 12, 3, 0, DateTimeKind.Utc)},
                //    { 5, 1, 8.9, 73.4, 0.33, 59.7, 16.9, new DateTime(2024, 12, 30, 11, 57, 56, 0, DateTimeKind.Utc)},
                //    { 6, 1, 12.2, 80.1, 0.21, 48.3, 24.6, new DateTime(2024, 10, 7, 16, 25, 37, 0, DateTimeKind.Utc)},
                //    { 7, 1, 9.5, 89.7, 0.95, 54.8, 35.7, new DateTime(2024, 1, 22, 20, 51, 48, 0, DateTimeKind.Utc)},
                //    { 8, 1, 11.7, 69.2, 0.57, 40.5, 5.2, new DateTime(2024, 11, 25, 0, 38, 29, 0, DateTimeKind.Utc)},
                //    { 9, 1, 10.4, 55.6, 0.42, 67.1, 27.4, new DateTime(2024, 5, 16, 22, 15, 50, 0, DateTimeKind.Utc)},
                //    { 10, 1, 14.8, 97.3, 0.82, 56.4, 31.0, new DateTime(2024, 3, 14, 3, 5, 12, 0, DateTimeKind.Utc)},
                //    { 11, 1, 9.7, 84.5, 0.69, 61.2, 11.3, new DateTime(2024, 9, 28, 7, 47, 6, 0, DateTimeKind.Utc)}
                //});
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
