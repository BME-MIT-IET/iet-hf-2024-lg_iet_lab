using Microsoft.AspNetCore.Mvc;
using Gombahaz.Models;
using Gombahaz.DataContexts;
using Gombahaz.DTO;

namespace Gombahaz.Repositories
{
    public interface IResourceRepository
    {
        public Task<ResourceItem> addResource(ResourceItem resourceItem);

        public Task<IEnumerable<ResourceItem>> getAllResources();

        public Task<ResourceItem?> getResourceById(int id);

        public Task<ResourceItem?> removeResource(ResourceItem resourceToRemove);

        public Task<ResourceItem?> updateResource(ResourceItem resourceToUpdate);

      
    }
 }
