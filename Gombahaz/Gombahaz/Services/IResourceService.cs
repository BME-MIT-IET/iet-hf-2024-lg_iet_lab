using Gombahaz.Models;
using Gombahaz.DTO;

namespace Gombahaz.Services
{
    public interface IResourceService
    {
        public Task<ResourceItem> addResource(ResourceItem resourceItem);

        public Task<IEnumerable<ResourceItem>> getAllResources();

        public Task<ResourceItem?> getResourceById(int id);

        public Task<ResourceItem?> removeResource(int resourceId);

        public Task<ResourceItem?> updateResource(int resourceId, ResourceItem resourceItem);
    }
}
