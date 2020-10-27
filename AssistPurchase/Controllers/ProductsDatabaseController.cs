using AssistPurchase.Models;
using AssistPurchase.Repositories.Abstractions;

using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AssistPurchase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsDatabaseController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsDatabaseController(IProductRepository repo)
        {
            _productRepository = repo;
        }
        // GET: api/<ProductsDatabaseController>
        [HttpGet("products")]
        public IActionResult Get()
        {
            return Ok(_productRepository.GetAllProducts());

        }

        [HttpGet("products/{productId}")]
        public IActionResult Get(string productId)
        {
            try
            {
                return Ok(_productRepository.GetProductById(productId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("products")]
        public IActionResult Post([FromBody] Product product)
        {
            
            try
            {
                _productRepository.AddProduct(product);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("products/{productId}")]
        public IActionResult Put(string productId, [FromBody] Product product)
        {

            try
            {
               _productRepository.UpdateProduct(productId, product);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("products/{productId}")]
        public IActionResult Delete(string productId)
        {
            
            try
            {
                _productRepository.DeleteProduct(productId);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
