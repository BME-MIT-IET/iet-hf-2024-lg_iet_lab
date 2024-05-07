using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gombahaz.Models
{
    [Table("DataSet")]
    public class DataSetItem
    {
        public int Id { get; set; } = 0;

        public int ResourceId { get; set; }

        [Required]
        public ResourceItem Resource { get; set; }

        [Required]
        public DateTime DataObserved { get; set; }
        public double? Temperature { get; set; }
        public double? Humidity { get; set; }
        public double? COLevel { get; set; }
        public double? SoilMoisture { get; set; }
        public double? SoilTemperature { get; set; }
    }
}
