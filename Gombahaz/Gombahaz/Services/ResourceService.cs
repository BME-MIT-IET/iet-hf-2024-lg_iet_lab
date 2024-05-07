using Gombahaz.Repositories;
using Gombahaz.Models;
using System.ComponentModel;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Components.Web;
using Gombahaz.DTO;
using Gombahaz.Mappers;
using System.ComponentModel.Design;

namespace Gombahaz.Services
{
    public class ResourceService : IResourceService
    {
        public readonly IResourceRepository resourceRepository;

        public ResourceService(IResourceRepository resourceRepository)
        {
            this.resourceRepository = resourceRepository;
        }

        public async Task<ResourceItem> addResource(ResourceItem resourceItem)
        {
            return await resourceRepository.addResource(resourceItem);
        }

        public async Task<IEnumerable<ResourceItem>> getAllResources()
        {
            return await resourceRepository.getAllResources();
        }

        public async Task<ResourceItem?> getResourceById(int id)
        {
            ResourceItem? retrievedResource = await resourceRepository.getResourceById(id);
            if (retrievedResource == null)
                return null;
            return retrievedResource;
        }

        public async Task<ResourceItem?> removeResource(int resourceId)
        {
            ResourceItem? resourceToRemove = await resourceRepository.getResourceById(resourceId);
            if (resourceToRemove == null)
                return null;

            await resourceRepository.removeResource(resourceToRemove);
            return resourceToRemove;
        }

        public async Task<ResourceItem?> updateResource(int resourceId, ResourceItem resourceUpdated)
        {
            ResourceItem? resourceToUpdate = await resourceRepository.getResourceById(resourceId);

            if (resourceToUpdate == null)
                return null;

            resourceToUpdate.Name = resourceUpdated.Name;
            resourceToUpdate.Address = resourceUpdated.Address;
            resourceToUpdate.Size = resourceUpdated.Size;
            resourceToUpdate.Comment = resourceUpdated.Comment;
            resourceToUpdate.Description = resourceUpdated.Description;
            return await resourceRepository.updateResource(resourceToUpdate);
        }
    }
}
