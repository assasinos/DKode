using Microsoft.AspNetCore.Mvc;

namespace FactoryAPI.Contracts.Requests
{
    public class ItemUpdateRequest
    {
        [FromRoute(Name = "id")]
        public Guid id { get; set; }

        [FromBody]
        public ItemRequest Item { get; set; } = default!;
    }
}
