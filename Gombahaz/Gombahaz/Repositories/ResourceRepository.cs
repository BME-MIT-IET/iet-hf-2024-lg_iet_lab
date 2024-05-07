using Gombahaz.DataContexts;
using Gombahaz.Models;
using Gombahaz.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gombahaz.Repositories
{
    public class ResourceRepository : IResourceRepository
    {
        private DataContext dataContext;

        public ResourceRepository(DataContext _dataContext) 
        {
            this.dataContext = _dataContext;
        }

        public async Task<ResourceItem> addResource(ResourceItem resourceItem)
        {
            dataContext.Resources.Add(resourceItem);
            await dataContext.SaveChangesAsync();
            return resourceItem;
        }

        public async Task<IEnumerable<ResourceItem>> getAllResources()
        {
            return await dataContext.Resources.ToListAsync();
        }

        public async Task<ResourceItem?> getResourceById(int id)
        {
            ResourceItem? foundResource = await dataContext.Resources.FindAsync(id);
            if (foundResource == null)
                return null;

            return foundResource;
        }

        public async Task<ResourceItem?> removeResource(ResourceItem resourceToRemove)
        {
            if (resourceToRemove == null)
                return null;
            
            dataContext.Resources.Remove(resourceToRemove);
            await dataContext.SaveChangesAsync();
            return resourceToRemove;
        }

        public async Task<ResourceItem?> updateResource(ResourceItem resourceToUpdate)
        {
            if (resourceToUpdate == null)
                return null;
            
            await dataContext.SaveChangesAsync();
            return resourceToUpdate;
        }

     
    }
}
