
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace AssistPurchase.Test
{
    public class FiltersControllerTest
    {
        [Fact]
        public async Task CheckStatusCodeEqualOkGetAllProducts()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CheckStatusCodeEqualOkGetProductById()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/CM");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestForInvalidProductId()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/XYZ");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenCompactFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/compact/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenGivenInvalidCompactFilterValue()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/compact/hsdg");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenBelowPriceFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/price/15000/below");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        [Fact]
        public async Task ReturnsBadRequestWhenGivenPriceAsInvalidValueFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/price/xyz/above");

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        [Fact]
        public async Task ReturnsProductListWhenGivenAbovePriceFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/price/15000/above");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenProductSpecificTrainingFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/productspecifictraining/false");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenSoftwareUpdateSupportFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/softwareupdatesupport/false");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenPortabilityFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/portability/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenBatterySupportFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/batterysupport/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenSafeToFlyFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/safetofly/false");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenThirdPartyDeviceSupportFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/thirdpartydevicesupport/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenTouchScreenFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/touchscreen/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenMultiPatientSupportFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/multipatientsupport/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsProductListWhenGivenCyberSecurityFilter()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/cybersecurity/true");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenProductSpecificTrainingFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/productspecifictraining/ajsdk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenSoftwareUpdateSupportFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/softwareupdatesupport/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenPortabilityFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/portability/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenBatterySupportFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/batterysupport/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenThirdPartyDeviceSupportFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/thirdpartydevicesupport/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenSafeToFlyFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/safetofly/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenTouchScreenFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/touchscreen/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenMultiPatientSupportFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/multipatientsupport/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task ReturnsBadRequestWhenCyberSecurityFilterValueIsCorrupted()
        {
            var setter = new ClientSetUp();
            var response = await setter.Client.GetAsync("api/productfilters/filters/cybersecurity/jdsk");
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

    }
}
