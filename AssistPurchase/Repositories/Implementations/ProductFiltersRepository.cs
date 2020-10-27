using System.Collections.Generic;
using AssistPurchase.Repositories.Abstractions;
using AssistPurchase.Repositories.FieldValidators;

namespace AssistPurchase.Repositories.Implementations
{
    public class ProductFiltersRepository : IFiltersRepository
    {
        private readonly ProductDbRepository _repo = new ProductDbRepository();
        private readonly CustomerAlertFieldValidator _validator = new CustomerAlertFieldValidator();
        public List<string> GetByCompactFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.Compact.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetAll()
        {
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
               prodList.Add(product.ProductName + " " + product.ProductId);
            }

            return prodList;
        }

        public string GetProduct(string productId)
        {
            var product =  _repo.GetProductById(productId);
            return product.ProductName + " " + product.ProductId;
        }

        public List<string> GetByProductSpecificTrainingFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.ProductSpecificTraining.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByPriceFilter(string amount, string belowOrAbove)
        {
            _validator.ValidAmount(amount);
            var prodList = belowOrAbove.ToLower() == "below" ? GetBelowRateProducts(amount) : GetAboveRateProducts(amount);
            return prodList;
        }

        public List<string> GetBySoftwareUpdateSupportFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.SoftwareUpdateSupport.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByPortabilityFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.Portability.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByBatterySupportFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.BatterySupport.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByThirdPartyDeviceSupportFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.ThirdPartyDeviceSupport.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetBySafeToFlyCertificationFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.SafeToFlyCertification.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByTouchScreenSupportFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.TouchScreenSupport.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByMultiPatientSupportFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.MultiPatientSupport.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        public List<string> GetByCyberSecurityFilter(string filterValue)
        {
            _validator.ValidateFilterValue(filterValue);
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (product.CyberSecurity.ToLower() == filterValue.ToLower())
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        private List<string> GetBelowRateProducts(string amount)
        {
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (double.Parse(amount) >= double.Parse(product.Price))
                {
                    prodList.Add(product.ProductName + " " + product.ProductId);
                }
            }

            return prodList;
        }

        private List<string> GetAboveRateProducts(string amount)
        {
            var products = _repo.GetAllProducts();
            var prodList = new List<string>();
            foreach (var product in products)
            {
                if (double.Parse(amount) <= double.Parse(product.Price))
                {
                    prodList.Add(product.ProductName+ " " +product.ProductId);
                }
            }

            return prodList;
        }

    }
}