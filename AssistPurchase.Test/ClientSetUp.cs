using AssistPurchase.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AssistPurchase.Test
{
    class ClientSetUp
    {
        public readonly HttpClient Client;
        public ClientSetUp()
        {
            this.Client = new TestClientProvider().Client;
        }

        public StringContent CreateProductContent(Product product)
        {
            var content = new StringContent(JsonConvert.SerializeObject(product), Encoding.UTF8, "application/json");
            return content;
        }

        public StringContent CreateAlertContent(CustomerAlert alert)
        {
            var content = new StringContent(JsonConvert.SerializeObject(alert), Encoding.UTF8, "application/json");
            return content;
        }
        public async Task SendInvalidPostRequest(StringContent content)
        {
            var response =  await this.Client.PostAsync("api/alert/alerts", content);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}