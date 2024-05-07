using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using Gombahaz.Models;
using Gombahaz.Services;
using Gombahaz.DTO;
using Gombahaz.Mappers;

namespace Gombahaz.Controllers
{
    [ApiController]
    [Route("api/resource")]
    public class ResourceController : ControllerBase
    {
        private readonly Services.IResourceService resourceService;

        public ResourceController(Services.IResourceService _resourceService)
        {
            this.resourceService = _resourceService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> addResource(ResourceInsertionDTO resourceInsertionDTO)
        {
            try
            {
                ResourceItem addedResource = await resourceService.addResource(ResourceMapper.resourceInsertionDTOToEntity(resourceInsertionDTO));
                return CreatedAtAction(nameof(getResourceById),new { resourceId = addedResource.Id }, addedResource);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ResourceDTO>>> getAllResources()
        {
            try
            {
                IEnumerable<ResourceItem> resourceItems = await resourceService.getAllResources();
                
                IEnumerable<ResourceDTO> returnInDTO = resourceItems.Select(ResourceMapper.entityToDTO).ToList();
                return Ok(returnInDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{resourceId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ResourceDTO>> getResourceById(int resourceId)
        {
            try
            {
                ResourceItem? resourceItem = await resourceService.getResourceById(resourceId);
                if (resourceItem == null)
                    return NotFound();

                ResourceDTO returnInDTO = ResourceMapper.entityToDTO(resourceItem);
                return Ok(returnInDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{resourceId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> removeResourceById(int resourceId)
        {
            try
            { 
                ResourceItem? resourceDeleted = await resourceService.removeResource(resourceId);
                if(resourceDeleted == null)
                    return NotFound();
                return NoContent();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("{resourceId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ResourceDTO>> updateResourceById(int resourceId, ResourceInsertionDTO resourceDTO)
        {
            try
            {
                ResourceItem resourceToUpdate = ResourceMapper.resourceInsertionDTOToEntity(resourceDTO);
                
                ResourceItem? updatedResource = await resourceService.updateResource(resourceId,resourceToUpdate);
                if(updatedResource == null)
                    return NotFound();

                ResourceDTO returnInDTO = ResourceMapper.entityToDTO(updatedResource);
                return Ok(resourceToUpdate);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
