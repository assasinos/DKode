namespace FactoryAPI.Contracts.Responses
{
    public class ItemResponse
    {
        public Guid Id { get; init; }

        public string Name { get; init; } = default!;

        public string Description { get; init; } = default!;

        public decimal Price { get; init; } = default!;
    }
}
