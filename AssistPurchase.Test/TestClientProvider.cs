using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace AssistPurchase.Test
{
    internal class TestClientProvider
    {
        public HttpClient Client { get; private set; }
        private TestServer _server;

        public TestClientProvider()
        {
            SetupClient();
        }

        private void SetupClient()
        {
            _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            Client = _server.CreateClient();
        }
    }
}