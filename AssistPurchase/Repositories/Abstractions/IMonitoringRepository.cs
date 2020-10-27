using System.Collections.Generic;
using AssistPurchase.Models;
namespace AssistPurchase.Repositories.Abstractions
{
    public interface IMonitoringRepository
    {
        public void Add(CustomerAlert alert);
        public IEnumerable<CustomerAlert> GetAllAlerts();
        
    }
}