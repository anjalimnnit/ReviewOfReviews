using System;
using AssistPurchase.Models;

namespace AssistPurchase.Repositories.FieldValidators
{
    public class CustomerAlertFieldValidator
    {
        private readonly CommonFieldValidator _validator = new CommonFieldValidator();
     
        public void ValidateCustomerAlertFields(CustomerAlert alert)
        {
            _validator.IsWhitespaceOrEmptyOrNull(alert.ProductId);
            _validator.IsWhitespaceOrEmptyOrNull(alert.CustomerName);
            _validator.IsWhitespaceOrEmptyOrNull(alert.PhoneNumber);
            _validator.IsWhitespaceOrEmptyOrNull(alert.CustomerEmailId);
           
        }

       public void ValidateFilterValue(string filter)
        {
            if (filter.ToLower() == "true" || filter.ToLower() == "false")
            {
                
            }
            else
            {
                throw new Exception("Invalid data ");
            }
        }
        public void ValidAmount(string amount)
        {
            if(float.TryParse(amount, out float i) && i!=0)
            {
                
            }
            else
            {
                throw new Exception("Invalid amount type");
            }
        }
    }
}
