using Gombahaz.Models;
using Gombahaz.DTO;
using Gombahaz.Services;
using Gombahaz.Mappers;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Gombahaz.Controllers
{
    [ApiController]
    [Route("api/dataset")]
    public class DataSetController : ControllerBase
    {
        private readonly IDataSetService dataService;

        public DataSetController(IDataSetService _dataService)
        {
            dataService = _dataService;
        }

        [HttpPost("{resourceId}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> insertDataSet(int resourceId,DataSetInsertionDTO datasetToInsert)
        {
            try
            {
                DataSetItem dbDataSetToInsert = DataSetMapper.dataSetInsertionDTOToEntity(datasetToInsert);
                DataSetItem insertedDataSet = await dataService.insertDataSet(dbDataSetToInsert, resourceId);
                DataSetDTO returnInDTO = DataSetMapper.entityToDTO(insertedDataSet);
                return CreatedAtAction(nameof(getDataSetById),new { id = returnInDTO.Id }, returnInDTO);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<DataSetDTO>> getDataSetById(int id)
        {
            try
            {
                DataSetItem retrievedDataSet = await dataService.getDataSetById(id);
                if (retrievedDataSet == null)
                    return NotFound();
                DataSetDTO returnInDTO = DataSetMapper.entityToDTO(retrievedDataSet);
                return Ok(returnInDTO);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("withresource/{resourceId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<DataSetDTO>>> getDataSetsByResourceId(int resourceId)
        {
            try
            {
                IEnumerable<DataSetItem> resultDataSets = await dataService.getDataSetsByResourceId(resourceId);

                if (resultDataSets == Enumerable.Empty<DataSetItem>())
                    return NotFound("There are no DataSets for this ID");

                IEnumerable<DataSetDTO> returnInDTO = resultDataSets.Select(DataSetMapper.entityToDTO).ToList();
                return Ok(returnInDTO);
            }
            catch (HttpRequestException ex)
            {
                if (ex.StatusCode == HttpStatusCode.NotFound)
                    return NotFound(ex.ToString());
                return BadRequest(ex.ToString());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("withresource/{resourceId}/withdate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<DataSetDTO>>> getDataSetsForDateInterval(int resourceId, string? dateStart, string? dateEnd)
        {
            try
            {
                IEnumerable<DataSetItem> resultDataSets = await dataService.getDataSetsForDateInterval(resourceId, dateStart, dateEnd);

                if (resultDataSets == Enumerable.Empty<DataSetItem>())
                    return NotFound("There are no DataSets for this ID");

                IEnumerable<DataSetDTO> returnInDTO = resultDataSets.Select(DataSetMapper.entityToDTO).ToList();
                return Ok(returnInDTO);
            }
            catch (HttpRequestException ex)
            {
                if (ex.StatusCode == HttpStatusCode.NotFound)
                    return NotFound(ex.ToString());
                return BadRequest(ex.ToString());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

    }
}
