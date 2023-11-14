using FactoryAPI.Contracts.Requests;
using FactoryAPI.Models;

namespace FactoryAPI.Mapping
{
    public static class ApiContractToDomainMapper
    {
        public static Item ToItem(this ItemRequest request)
        {
            return new Item()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
            };
        }
    }
}
