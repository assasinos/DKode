using FactoryAPI.Contracts.Responses;
using FactoryAPI.Models;

namespace FactoryAPI.Mapping
{
    public static class DomainToApiContractMapper
    {
        public static ItemResponse ToItemResponse(this Item item)
        {
            return new ItemResponse
            {
                Id = item.Id,
                Description = item.Description,
                Name = item.Name,
                Price = item.Price,
            };
        }
        public static GetAllItemsResponse ToItemsResponse(this IEnumerable<Item> items)
        {
            return new GetAllItemsResponse
            {
                Items = items.Select(x => new ItemResponse
                {
                    Id = x.Id,
                    Description = x.Description,
                    Name = x.Name,
                    Price = x.Price
                })
            };
        }
    }
}
