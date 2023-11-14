using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace FactoryAPI.Validation
{
    public class ValidationExceptionMiddleware
    {
        private readonly RequestDelegate _request;

        public ValidationExceptionMiddleware(RequestDelegate request)
        {
            _request = request;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _request(context);
            }
            catch (ValidationException ex)
            {

                context.Response.StatusCode = 400;

                var error = new ValidationProblemDetails
                {
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    Status = 400,
                    Extensions =
                    {
                        ["traceId"] = context.TraceIdentifier
                    }
                };

                foreach (var failure in ex.Errors)
                {
                    error.Errors.Add(new KeyValuePair<string, string[]>(
                    failure.PropertyName,
                    new[] { failure.ErrorMessage }));
                }
                await context.Response.WriteAsJsonAsync(error);
            }
        }
    }
}
