using Gombahaz.Models;

namespace Gombahaz.DTO
{
    public class ResourceDTO
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public string Address { get; set; }

        public string Size { get; set; }

        public string? Comment { get; set; }

        public string? Description { get; set; }

    }
}
