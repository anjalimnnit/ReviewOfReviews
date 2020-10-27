using AssistPurchase.Models;
using System.Collections.Generic;

namespace AssistPurchase.Repositories.Abstractions
{
    public interface IProductRepository
    {
        public void AddProduct(Product newState);
        public IEnumerable<Product> GetAllProducts();
        public Product GetProductById(string productId);
        public void DeleteProduct(string productId);
      
        public void UpdateProduct(string productId,Product state);
    }
}