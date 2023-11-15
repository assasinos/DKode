using FactoryAPI.Contracts.Requests;
using FluentValidation;

namespace FactoryAPI.Validation
{
    public class ItemRequestValidator : AbstractValidator<ItemRequest>
    {
        public ItemRequestValidator()
        {
            //A precision of 18 and scale of 2 digits allows us to represent prices from 00.01 up to 999999999999999999.99
            RuleFor(x => x.Price).PrecisionScale(18,2,false);
            //4000 is char limit for nvarchar
            RuleFor(x => x.Name).NotNull().MaximumLength(4000);
            RuleFor(x => x.Description).MaximumLength(4000);
        }
    }
}
