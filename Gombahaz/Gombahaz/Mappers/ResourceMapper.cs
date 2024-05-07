using Gombahaz.DTO;
using Gombahaz.Models;

namespace Gombahaz.Mappers
{
    public static class ResourceMapper
    {
        public static ResourceDTO entityToDTO(ResourceItem resourceItem)
        {
            return new ResourceDTO()
            {
                Id = resourceItem.Id,
                Name = resourceItem.Name,
                Address = resourceItem.Address,
                Size = resourceItem.Size,
                Comment = resourceItem.Comment,
                Description = resourceItem.Description,
            };
            
        }

        public static ResourceItem resourceInsertionDTOToEntity(ResourceInsertionDTO resourceInsertionDTO)
        {
            return new ResourceItem()
            {
                Id = 0,
                Name = resourceInsertionDTO.Name,
                Address = resourceInsertionDTO.Address,
                Size = resourceInsertionDTO.Size,
                Comment = resourceInsertionDTO.Comment,
                Description = resourceInsertionDTO.Description,
            };
        }

        public static ResourceItem DTOToEntity(ResourceDTO resourceDTO)
        {
            return new ResourceItem()
            {
                Id = resourceDTO.Id,
                Name = resourceDTO.Name,
                Address = resourceDTO.Address,
                Size = resourceDTO.Size,
                Comment = resourceDTO.Comment,
                Description = resourceDTO.Description,
            };
        }

    }
}
