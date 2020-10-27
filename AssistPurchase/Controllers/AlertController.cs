
using AssistPurchase.Models;
using AssistPurchase.Repositories.Abstractions;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AssistPurchase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertController : ControllerBase
    {
        private readonly IMonitoringRepository _monitoringRepository;

        public AlertController(IMonitoringRepository repo)
        {
            _monitoringRepository = repo;
        }
        [HttpGet("alerts")]
        public IActionResult Get()
        {
            return Ok(_monitoringRepository.GetAllAlerts());
        }

       

        [HttpPost("alerts")]
        public IActionResult Post([FromBody] CustomerAlert alert)
        {
            try
            {
                _monitoringRepository.Add(alert);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
