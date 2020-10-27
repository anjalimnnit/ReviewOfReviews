using System;
using System.Collections.Generic;
using AssistPurchase.Models;

namespace AssistPurchase.Repositories.FieldValidators
{
    public class ProductFieldsValidator
    {
        private readonly CommonFieldValidator _validator = new CommonFieldValidator();
        public void ValidateProductFields(Product product)
        {
            _validator.IsWhitespaceOrEmptyOrNull(product.Price);
            _validator.IsWhitespaceOrEmptyOrNull(product.Description);
            _validator.IsWhitespaceOrEmptyOrNull(product.ProductId);
            _validator.IsWhitespaceOrEmptyOrNull(product.ProductName);
            _validator.IsWhitespaceOrEmptyOrNull(product.CyberSecurity);
            _validator.IsWhitespaceOrEmptyOrNull(product.MultiPatientSupport);
            _validator.IsWhitespaceOrEmptyOrNull(product.SafeToFlyCertification);
            _validator.IsWhitespaceOrEmptyOrNull(product.ThirdPartyDeviceSupport);
            _validator.IsWhitespaceOrEmptyOrNull(product.TouchScreenSupport);
            _validator.IsWhitespaceOrEmptyOrNull(product.BatterySupport);
            _validator.IsWhitespaceOrEmptyOrNull(product.ProductSpecificTraining);
            _validator.IsWhitespaceOrEmptyOrNull(product.Portability);
            _validator.IsWhitespaceOrEmptyOrNull(product.Compact);
            _validator.IsWhitespaceOrEmptyOrNull(product.SoftwareUpdateSupport);
        }

        public void ValidateNewProductId(string productId, Product productRecord, IEnumerable<Product> products)
        {
            
            foreach (var product in products)
            {
                if (product.ProductId == productId)
                {
                    throw new Exception("Invalid Patient Id");
                }
            }

            ValidateProductFields(productRecord);
        }

        public void ValidateOldProductId(string productId, IEnumerable<Product> products)
        {

            foreach (var product in products)
            {
                if (product.ProductId == productId)
                {
                    return;
                }
            }

            throw new Exception("Invalid data filed");
        }
    }
}
