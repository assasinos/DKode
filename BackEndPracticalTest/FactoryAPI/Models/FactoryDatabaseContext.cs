#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FactoryAPI.Models;

public partial class FactoryDatabaseContext : DbContext
{
    //Constructor to allow connection made from program.cs
    public FactoryDatabaseContext(DbContextOptions<FactoryDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }
}