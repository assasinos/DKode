namespace FactoryAPI.Contracts.Requests
{
    public class ItemRequest
    {
        public string Name { get; set; } = default!;

        public string Description { get; set; } =default!;

        public decimal Price { get; set; } = default!;
    }
}
