using Gombahaz.Models;
using Gombahaz.DTO;

namespace Gombahaz.Repositories
{
    public interface IDataSetRepository
    {
        public Task<DataSetItem> insertDataSet(DataSetItem datasetToInsert);
        public Task<DataSetItem?> getDataSetById(int dataSetId);
        public Task<IEnumerable<DataSetItem>> getDataSetsByResourceId(ResourceItem resourceWithSpecifiedId);
        public Task<IEnumerable<DataSetItem>> getDataSetsForDateInterval(ResourceItem resourceWithSpecifiedId, DateTime? dateStart, DateTime? dateEnd);
    }
}
