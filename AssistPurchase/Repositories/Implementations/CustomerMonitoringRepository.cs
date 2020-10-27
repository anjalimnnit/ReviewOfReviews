using AssistPurchase.Models;
using AssistPurchase.Repositories.Abstractions;
using System.Collections.Generic;
using AssistPurchase.Repositories.FieldValidators;
using System.Data.SQLite;
using System.Net.Mail;
using System;
using System.Diagnostics.CodeAnalysis;


namespace AssistPurchase.Repositories.Implementations
{
    public class CustomerMonitoringRepository : IMonitoringRepository
    {
        private readonly CustomerAlertFieldValidator _validator = new CustomerAlertFieldValidator();
       

        public IEnumerable<CustomerAlert> GetAllAlerts()
        {
            var con = GetConnection();
            con.Open();
            var list = new List<CustomerAlert>();
            var stm = @"SELECT CustomerName,CustomerEmailId,ProductId,PhoneNumber FROM Customer";
            using var cmd1 = new SQLiteCommand(stm, con);
            using var rdr = cmd1.ExecuteReader();
            while (rdr.Read())
            {
                list.Add(new CustomerAlert()
                {
                    CustomerName = rdr.GetString(0),
                    CustomerEmailId = rdr.GetString(1),
                    ProductId =rdr.GetString(2),
                    PhoneNumber = rdr.GetString(3)
                    
                });
            }
            con.Close();
        
            return list;
        }
        [ExcludeFromCodeCoverage]
       
        private void SendMail(CustomerAlert body)
        {
            MailMessage mailMessage = new MailMessage("alerttocare@gmail.com", "alerttocare@gmail.com")
            {
                Body = "Customer Name : " + body.CustomerName + "\nCustomer Email Id : " +
                               body.CustomerEmailId + "\nPhone Number : " + body.PhoneNumber + "\nProduct ID : " +
                               body.ProductId
            };
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = true,
                Credentials = new System.Net.NetworkCredential()
                {
                    UserName = "alerttocare@gmail.com",
                    Password = "admin@1234"
                },

                EnableSsl = true
            };
            try
            {
                smtpClient.Send(mailMessage);
            }
            catch 
            {
                throw new Exception("Invalid data field");
            }
        }
            public void Add(CustomerAlert alert)
        {
            _validator.ValidateCustomerAlertFields(alert);
            var con = GetConnection();
            con.Open();
            var cmd = new SQLiteCommand(con)
            {

                CommandText =
                    @"INSERT INTO Customer(CustomerName,CustomerEmailId,ProductId,PhoneNumber)VALUES(@customerName,@customerEmailId,@productId,@phoneNumber)"
            };

            cmd.Parameters.AddWithValue("@customerName", alert.CustomerName);
            cmd.Parameters.AddWithValue("@customerEmailId", alert.CustomerEmailId);
            cmd.Parameters.AddWithValue("@productId", alert.ProductId);
            cmd.Parameters.AddWithValue("@phoneNumber", alert.PhoneNumber);

            cmd.Prepare();
            cmd.ExecuteNonQuery();

            con.Close();
            SendMail(alert);
        
        }

        

        private static SQLiteConnection GetConnection()
        {
            var con = new SQLiteConnection(@"data source==D:\a\assist-purchase-s22b3\assist-purchase-s22b3\AssistPurchase\ProductInfo.db");
            return con;
        }
    }
}