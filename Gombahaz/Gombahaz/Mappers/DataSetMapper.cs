using Gombahaz.DTO;
using Gombahaz.Models;
using Microsoft.Extensions.Logging;

namespace Gombahaz.Mappers
{
    public static class DataSetMapper
    {
        public static DataSetDTO entityToDTO(DataSetItem dataSetItem)
        {
            return new DataSetDTO()
            {
                Id = dataSetItem.Id,
                DataObserved = dataSetItem.DataObserved,
                Temperature = dataSetItem.Temperature,
                Humidity = dataSetItem.Humidity,
                COLevel= dataSetItem.COLevel,
                SoilMoisture = dataSetItem.SoilMoisture,
                SoilTemperature = dataSetItem.SoilTemperature,
                ResourceId = dataSetItem.Id
            };
        }

        public static DataSetItem dataSetInsertionDTOToEntity(DataSetInsertionDTO dataSetInsertion)
        {
            return new DataSetItem()
            {
                DataObserved = dataSetInsertion.DataObserved,
                Temperature = dataSetInsertion.Temperature,
                Humidity = dataSetInsertion.Humidity,
                COLevel = dataSetInsertion.COLevel,
                SoilMoisture = dataSetInsertion.SoilMoisture,
                SoilTemperature= dataSetInsertion.SoilTemperature,
            };
        }

        public static DataSetItem DTOToEntity(DataSetDTO dataSetDTO)
        {
            return new DataSetItem()
            {
                Id = dataSetDTO.Id,
                DataObserved = dataSetDTO.DataObserved,
                Temperature = dataSetDTO.Temperature,
                Humidity= dataSetDTO.Humidity,
                COLevel = dataSetDTO.COLevel,
                SoilMoisture = dataSetDTO.SoilMoisture,
                SoilTemperature = dataSetDTO.SoilTemperature,
            };
        }
    }
}
