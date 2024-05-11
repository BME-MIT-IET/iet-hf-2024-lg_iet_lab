using Gombahaz.DataContexts;
using Gombahaz.DTO;
using Gombahaz.Mappers;
using Gombahaz.Models;
using Microsoft.EntityFrameworkCore;

namespace Gombahaz.Repositories
{
    public class DataSetRepository : IDataSetRepository
    {

        private DataContext dataContext;

        public DataSetRepository(DataContext _dataContext)
        {
            this.dataContext = _dataContext;
        }

        public async Task<DataSetItem?> getDataSetById(int dataSetId)
        {
            //itt a Resource-t nem tölti be egyelőre (később probléma lehet)
            DataSetItem? retrievedDataSet = await dataContext.DataSets
                .Include(ds => ds.Resource)
                .Where(ds => ds.Id == dataSetId)
                .SingleAsync();
            if (retrievedDataSet == null)
                return null;

            return retrievedDataSet;
        }

        public async Task<DataSetItem> insertDataSet(DataSetItem datasetToInsert)
        {
            dataContext.DataSets.Add(datasetToInsert);
            await dataContext.SaveChangesAsync();
            return datasetToInsert;
        }

        public async Task<IEnumerable<DataSetItem>> getDataSetsByResourceId(ResourceItem resourceWithSpecifiedId)
        {

            IEnumerable<DataSetItem> dataSetItemsForResource = await dataContext.DataSets
                .Where(ds => ds.Resource == resourceWithSpecifiedId).OrderByDescending(ds => ds.DataObserved)
                .ToListAsync();

            if (dataSetItemsForResource == null)
                return Enumerable.Empty<DataSetItem>();

            return dataSetItemsForResource;
        }
        public async Task<IEnumerable<DataSetItem>> getDataSetsForDateInterval(ResourceItem resourceWithSpecifiedId, DateTime? dateStart, DateTime? dateEnd)
        {
            IEnumerable<DataSetItem> dataSetItemsForDateInterval = null;
            if (dateStart == null && dateEnd == null)
            {
                dataSetItemsForDateInterval = await dataContext.DataSets
              .Where(ds => ds.Resource == resourceWithSpecifiedId).OrderBy(ds => ds.DataObserved)
              .ToListAsync();
            }
            else
            {
                dataSetItemsForDateInterval = await dataContext.DataSets
                    .Where(ds => ds.Resource == resourceWithSpecifiedId && ds.DataObserved > dateStart && ds.DataObserved < dateEnd)
                    .OrderBy(ds => ds.DataObserved)
                    .ToListAsync();
            }
           

            if (dataSetItemsForDateInterval == null)
                return Enumerable.Empty<DataSetItem>();

            return dataSetItemsForDateInterval;
        }
    }
}
