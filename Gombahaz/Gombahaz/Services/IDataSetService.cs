using Gombahaz.DTO;
using Gombahaz.Models;

namespace Gombahaz.Services
{
    public interface IDataSetService
    {
        public Task<DataSetItem> insertDataSet(DataSetItem datasetToInsert, int resourceId);
        public Task<DataSetItem> getDataSetById(int id);

        public Task<IEnumerable<DataSetItem>> getDataSetsByResourceId(int resourceId);

        public Task<IEnumerable<DataSetItem>> getDataSetsForDateInterval(int resourceId, string? dateStart, string? dateEnd);


    }
}
