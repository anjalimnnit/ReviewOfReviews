using AssistPurchase.Repositories.Abstractions;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AssistPurchase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductFiltersController : ControllerBase
    {
        private readonly IFiltersRepository _filtersRepository;

        public ProductFiltersController(IFiltersRepository repo)
        {
            _filtersRepository = repo;
        }

        [HttpGet("filters")]
        public IActionResult Get()
        {
            return Ok(_filtersRepository.GetAll());
        }

        [HttpGet("filters/{productId}")]
        public IActionResult Get(string productId)
        {
            try
            {
                return Ok(_filtersRepository.GetProduct(productId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/compact/{filterValue}")]
        public IActionResult GetByCompactFilter(string filterValue )
        {
            try
            {
                return Ok(_filtersRepository.GetByCompactFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet("filters/price/{amount}/{belowOrAbove}")]
        public IActionResult Get(string amount, string belowOrAbove)
        {
            try
            {

                return Ok(_filtersRepository.GetByPriceFilter(amount, belowOrAbove));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/ProductSpecificTraining/{filterValue}")]
        public IActionResult GetByProductTrainingFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByProductSpecificTrainingFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/SoftwareUpdateSupport/{filterValue}")]
        public IActionResult GetByUpdateSupportFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetBySoftwareUpdateSupportFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/Portability/{filterValue}")]
        public IActionResult GetByPortabilityFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByPortabilityFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/BatterySupport/{filterValue}")]
        public IActionResult GetByBatterySupportFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByBatterySupportFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/ThirdPartyDeviceSupport/{filterValue}")]
        public IActionResult GetByThirdPartyDeviceFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByThirdPartyDeviceSupportFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/SafeToFly/{filterValue}")]
        public IActionResult GetBySafeToFlyFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetBySafeToFlyCertificationFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/TouchScreen/{filterValue}")]
        public IActionResult GetByTouchScreenFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByTouchScreenSupportFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/MultiPatientSupport/{filterValue}")]
        public IActionResult GetByMultiPatientSupportFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByMultiPatientSupportFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("filters/CyberSecurity/{filterValue}")]
        public IActionResult GetByCyberSecurityFilter(string filterValue)
        {
            try
            {
                return Ok(_filtersRepository.GetByCyberSecurityFilter(filterValue));
            }
            catch
            {
                return BadRequest();
            }
        }
        }
}
