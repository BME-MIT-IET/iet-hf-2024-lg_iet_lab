namespace Gombahaz.DTO
{
    public class DataSetInsertionDTO
    {
        public DateTime DataObserved { get; set; }
        public double? Temperature { get; set; }
        public double? Humidity { get; set; }
        public double? COLevel { get; set; }
        public double? SoilMoisture { get; set; }
        public double? SoilTemperature { get; set; }
    }
}
