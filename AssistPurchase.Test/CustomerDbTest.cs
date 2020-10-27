
using System.Net;
using System.Threading.Tasks;
using AssistPurchase.Models;
using Xunit;

namespace AssistPurchase.Test
{

    public class CustomerDbTest

    { 
        [Fact]
        public async Task CheckStatusCodeEqualOkGetAllProducts()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/alert/alerts");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsOkStatusCodeWhenAlertIsAdded()
        {
            
            var setter = new ClientSetUp();
            var alert = new CustomerAlert()
            {
                
                CustomerName = "Venkat",
                CustomerEmailId = "venkat123@gmail.com",
                ProductId = "X3",
                PhoneNumber = "7874393847"
            };

            var content = setter.CreateAlertContent(alert);
            var response = await setter.Client.PostAsync("api/alert/alerts", content);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        }
        [Fact]
        public async Task ReturnsBadRequestStatusCodeWhenAFieldIsNull()
        {
            var setter = new ClientSetUp();
            var alert = new CustomerAlert()
            {
                CustomerName = null,
                CustomerEmailId = "venkat123@gmail.com",
                ProductId = "AB",
                PhoneNumber = "7874393847"
            };

            var content = setter.CreateAlertContent(alert);
            await setter.SendInvalidPostRequest(content);

        }
    }
}
