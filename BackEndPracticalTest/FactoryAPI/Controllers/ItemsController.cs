using FactoryAPI.Contracts.Requests;
using FactoryAPI.Mapping;
using FactoryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FactoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly FactoryDatabaseContext _dbContext;

        public ItemsController(FactoryDatabaseContext context)
        {
            _dbContext = context;
        }

        // Create a new item
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ItemRequest request)
        {
            var item = request.ToItem();

            await _dbContext.Items.AddAsync(item);

            await _dbContext.SaveChangesAsync();

            var itemResponse = item.ToItemResponse();


            return CreatedAtAction("Get", new { itemResponse.Id }, itemResponse);
        }

        // Retrieve a single item
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var item = await _dbContext.Items.FindAsync(id);

            if (item is null) {
                return NotFound();
            }

            var itemResponse = item.ToItemResponse();
            return Ok(itemResponse);
        }


        // Retrieve all items (only if you'll be using an ORM framework)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = _dbContext.Items;

            var itemsResponse = items.ToItemsResponse();

            return Ok(itemsResponse);
        }

        // Update an existing item

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromMultiSource] ItemUpdateRequest request)
        {
            var existingItem = await _dbContext.Items.FindAsync(request.id);

            if (existingItem is null)
            {
                return NotFound();
            }
            var newItem = request.ToItem();
            existingItem.Description = newItem.Description;
            existingItem.Price = newItem.Price;
            existingItem.Name = newItem.Name;

            await _dbContext.SaveChangesAsync();

            var itemResponse = existingItem.ToItemResponse();


            return Ok(itemResponse);
        }

        // Delete an item
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var item = await _dbContext.Items.FindAsync(id);

            if (item is null)
            {
                return NotFound();
            }

            _dbContext.Items.Remove(item);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }


    }
}
