using FactoryAPI.Contracts.Requests;
using FluentValidation;

namespace FactoryAPI.Validation
{
    public class ItemRequestValidator : AbstractValidator<ItemRequest>
    {
        public ItemRequestValidator()
        {
            //00.01 => 999999999999999999.99
            RuleFor(x => x.Price).PrecisionScale(18,2,false);
            RuleFor(x => x.Name).NotNull();
            RuleFor(x => x.Description).NotNull();
        }
    }
}
