using AssistPurchase.Models;
using AssistPurchase.Repositories.Abstractions;
using System.Collections.Generic;
using System.Data.SQLite;
using AssistPurchase.Repositories.FieldValidators;


namespace AssistPurchase.Repositories.Implementations
{
    public class ProductDbRepository : IProductRepository
    {
        private readonly ProductFieldsValidator _validator = new ProductFieldsValidator();
        public void AddProduct(Product product)
        {
            var products = GetAllProducts();
            _validator.ValidateNewProductId(product.ProductId, product, products);
            var con = GetConnection();
            con.Open();

            var cmd = new SQLiteCommand(con)
            {
                CommandText =
                    @"INSERT INTO MonitoringProducts(ProductId,ProductName,Description,ProductSpecificTraining,Price,SoftwareUpdateSupport,Portability,Compact,BatterySupport,ThirdPartyDeviceSupport,SafeToFlyCertification,TouchScreenSupport,MultiPatientSupport,CyberSecurity) 
                      VALUES (@productId, @productName,@description,@productSpecificTraining,@price,@softwareUpdateSupport,
                              @portability ,@compact,@batterySupport,@thirdPartyDeviceSupport,@safeToFlyCertification,@touchScreenSupport,@multiPatientSupport,@cyberSecurity)"
            };

            cmd.Parameters.AddWithValue("@productId", product.ProductId);
            cmd.Parameters.AddWithValue("@productName", product.ProductName);
            cmd.Parameters.AddWithValue("@description", product.Description);
            cmd.Parameters.AddWithValue("@productSpecificTraining", product.ProductSpecificTraining);
            cmd.Parameters.AddWithValue("@price",product.Price);
            cmd.Parameters.AddWithValue("@softwareUpdateSupport", product.SoftwareUpdateSupport);
            cmd.Parameters.AddWithValue("@portability", product.Portability);
            cmd.Parameters.AddWithValue("@compact", product.Compact);
            cmd.Parameters.AddWithValue("@batterySupport", product.BatterySupport);
            cmd.Parameters.AddWithValue("@thirdPartyDeviceSupport", product.ThirdPartyDeviceSupport);
            cmd.Parameters.AddWithValue("@safeToFlyCertification", product.SafeToFlyCertification);
            cmd.Parameters.AddWithValue("@touchScreenSupport", product.TouchScreenSupport);
            cmd.Parameters.AddWithValue("@multiPatientSupport", product.MultiPatientSupport);
            cmd.Parameters.AddWithValue("@cyberSecurity", product.CyberSecurity);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
            con.Close();
        }

        public void DeleteProduct(string id)
        {
            var products = GetAllProducts();
            _validator.ValidateOldProductId(id, products);
            var con = GetConnection();
            con.Open();
            var cmd = new SQLiteCommand(con)
            {
                CommandText = $@"DELETE FROM MonitoringProducts WHERE ProductId='{id}'"
            };
            cmd.ExecuteNonQuery();
            con.Close();
        }



        public IEnumerable<Product> GetAllProducts()
        {

            var con = GetConnection();
            con.Open();
            var list = new List<Product>();
            var stm = @"SELECT p.ProductId,p.ProductName,Description,ProductSpecificTraining,Price,SoftwareUpdateSupport,Portability,Compact,BatterySupport,ThirdPartyDeviceSupport,SafeToFlyCertification,TouchScreenSupport,MultiPatientSupport,CyberSecurity FROM MonitoringProducts p";
            using var cmd1 = new SQLiteCommand(stm, con);
            using var rdr = cmd1.ExecuteReader();

            while (rdr.Read())
            {
                list.Add(new Product()
                {
                    ProductId = rdr.GetString(0),
                    ProductName = rdr.GetString(1),
                    Description = rdr.GetString(2),
                    ProductSpecificTraining = rdr.GetString(3),
                    Price =rdr.GetString(4),
                    SoftwareUpdateSupport = rdr.GetString(5),
                    Portability = rdr.GetString(6),
                    Compact =rdr.GetString(7),
                    BatterySupport = rdr.GetString(8),
                    ThirdPartyDeviceSupport = rdr.GetString(9),
                    SafeToFlyCertification = rdr.GetString(10),
                    TouchScreenSupport = rdr.GetString(10),
                    MultiPatientSupport = rdr.GetString(11),
                    CyberSecurity =rdr.GetString(12)
                });
            }
            con.Close();
            return list;
        }

        public Product GetProductById(string productId)
        {
            var products = GetAllProducts(); 
            _validator.ValidateOldProductId(productId, products);
            var con = GetConnection();
            con.Open();


            var stm = $@"SELECT ProductId, ProductName, Description, ProductSpecificTraining, Price, SoftwareUpdateSupport, Portability , Compact, BatterySupport, ThirdPartyDeviceSupport, SafeToFlyCertification, TouchScreenSupport, MultiPatientSupport, CyberSecurity FROM MonitoringProducts WHERE ProductId= '{productId}'";
            using var cmd1 = new SQLiteCommand(stm, con);
            using var reader = cmd1.ExecuteReader();
            var product = new Product();

            while (reader.Read())
            {
                product.ProductId = reader.GetString(0);
                product.ProductName = reader.GetString(1);
                product.Description = reader.GetString(2);
                product.ProductSpecificTraining = reader.GetString(3);
                product.Price = reader.GetString(4);
                product.SoftwareUpdateSupport = reader.GetString(5);
                product.Portability = reader.GetString(6);
                product.Compact = reader.GetString(7);
                product.BatterySupport = reader.GetString(8);
                product.ThirdPartyDeviceSupport = reader.GetString(9);
                product.SafeToFlyCertification = reader.GetString(10);
                product.TouchScreenSupport =reader.GetString(10);
                product.MultiPatientSupport = reader.GetString(11);
                product.CyberSecurity = reader.GetString(12);

            }
            con.Close();
            return product;
        }
        public void UpdateProduct(string id, Product product)
        {
            var products = GetAllProducts();
            _validator.ValidateOldProductId(id, products);
            _validator.ValidateProductFields(product);
            DeleteProduct(id);
            AddProduct(product);
        }

        private static SQLiteConnection GetConnection()
        {
            var con = new SQLiteConnection(
                @"data source==D:\a\assist-purchase-s22b3\assist-purchase-s22b3\AssistPurchase\ProductInfo.db");
            return con;
        }

    }
}