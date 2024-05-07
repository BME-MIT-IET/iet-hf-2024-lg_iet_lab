using Gombahaz.DTO;
using Gombahaz.Mappers;
using Gombahaz.Models;
using Gombahaz.Repositories;
using System.ComponentModel.Design;
using System.Net;

namespace Gombahaz.Services
{
    public class DataSetService : IDataSetService
    {
        public readonly IDataSetRepository datasetRepository;

        public readonly IResourceRepository resourceRepository;

        public DataSetService(IDataSetRepository _datasetRepository, IResourceRepository resourceRepository)
        {
            this.datasetRepository = _datasetRepository;
            this.resourceRepository = resourceRepository;
        }
        public async Task<DataSetItem> getDataSetById(int id)
        {
            DataSetItem? retrievedDataSet =  await datasetRepository.getDataSetById(id);
            
            if (retrievedDataSet == null)
                throw new Exception($"Element with id={id} is not found!");

            return retrievedDataSet;
        }

        public async Task<DataSetItem> insertDataSet(DataSetItem datasetToInsert, int resourceId)
        {
            ResourceItem? resourceItem = await resourceRepository.getResourceById(resourceId);
            
            if (resourceItem == null)
                throw new Exception($"There is no resource with the id={resourceId}");

            datasetToInsert.Resource = resourceItem;
            return await datasetRepository.insertDataSet(datasetToInsert);
        }

        public async Task<IEnumerable<DataSetItem>> getDataSetsByResourceId(int resourceId)
        {
            ResourceItem? resourceWithSpecifiedId = await resourceRepository.getResourceById(resourceId);
            if (resourceWithSpecifiedId == null)
                throw new HttpRequestException($"Resource with id={resourceId} does not exist!",new Exception(),HttpStatusCode.NotFound);
            IEnumerable<DataSetItem> resultDatSets = await datasetRepository.getDataSetsByResourceId(resourceWithSpecifiedId);
            return resultDatSets;
        }

        public async Task<IEnumerable<DataSetItem>> getDataSetsForDateInterval(int resourceId, string? _dateStart, string? _dateEnd)
        {   
            ResourceItem? resourceWithSpecifiedId = await resourceRepository.getResourceById(resourceId);
            if (resourceWithSpecifiedId == null)
                throw new HttpRequestException($"Resource with id={resourceId} does not exist!", new Exception(), HttpStatusCode.NotFound);

            DateTime? dateStart = null;
            DateTime? dateEnd = null;
            if(!string.IsNullOrEmpty(_dateStart) && !string.IsNullOrEmpty(_dateEnd))
            { 
                dateStart = DateTime.ParseExact(_dateStart + " 00:00:00", "yyyy-MM-dd HH:mm:ss", null).ToUniversalTime();
                dateEnd = DateTime.ParseExact(_dateEnd+" 23:59:59", "yyyy-MM-dd HH:mm:ss", null).ToUniversalTime();
            }

            IEnumerable<DataSetItem> resultDatSets = await datasetRepository.getDataSetsForDateInterval(resourceWithSpecifiedId,dateStart,dateEnd);
            return resultDatSets;
        }
    }
}
