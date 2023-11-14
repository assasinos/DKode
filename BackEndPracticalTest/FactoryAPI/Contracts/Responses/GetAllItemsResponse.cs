namespace FactoryAPI.Contracts.Responses
{
    public class GetAllItemsResponse
    {
        public IEnumerable<ItemResponse> Items { get; init; } = Enumerable.Empty<ItemResponse>();
    }
}
