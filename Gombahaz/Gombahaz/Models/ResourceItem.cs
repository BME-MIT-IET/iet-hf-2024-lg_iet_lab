using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gombahaz.Models
{
    [Table("Resource")]
    public class ResourceItem
    {
        public int Id { get; set; } = 0;

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Size { get; set; }

        public string? Comment { get; set; }
        public string? Description { get; set; }

        public ICollection<DataSetItem> DataSets { get; set; } = [];
    }
}
