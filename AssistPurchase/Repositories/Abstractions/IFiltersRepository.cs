using System.Collections.Generic;

namespace AssistPurchase.Repositories.Abstractions
{
    public interface IFiltersRepository
    {
        public List<string> GetByCompactFilter(string filterValue);
        public List<string> GetAll();
        public string GetProduct(string productId);
        public List<string> GetByProductSpecificTrainingFilter(string filterValue);
        public List<string> GetByPriceFilter(string amount, string belowOrAbove);
        public List<string> GetBySoftwareUpdateSupportFilter(string filterValue);
        public List<string> GetByPortabilityFilter(string filterValue);
        public List<string> GetByBatterySupportFilter(string filterValue);
        public List<string> GetByThirdPartyDeviceSupportFilter(string filterValue);
        public List<string> GetBySafeToFlyCertificationFilter(string filterValue);
        public List<string> GetByTouchScreenSupportFilter(string filterValue);
        public List<string> GetByMultiPatientSupportFilter(string filterValue);
        public List<string> GetByCyberSecurityFilter(string filterValue);

    }
}