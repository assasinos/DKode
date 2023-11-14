using FactoryAPI.Models;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using FactoryAPI.Validation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Add controllers and FluentValidation
builder.Services.AddControllers().AddFluentValidation(x =>
{
    //Register validators
    x.RegisterValidatorsFromAssemblyContaining<Program>();
    //Disable Data Annotations, bcs Validator is doing the job
    x.DisableDataAnnotationsValidation = true;
}); ;


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add Database context
builder.Services.AddDbContext<FactoryDatabaseContext>(options =>
{
    //Connect to the SQL server with connection string stated in appsettings.json
    options.UseSqlServer(builder.Configuration.GetConnectionString("FactoryDatabase"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

//Register Exception Middleware
app.UseMiddleware<ValidationExceptionMiddleware>();

app.MapControllers();

app.Run();
