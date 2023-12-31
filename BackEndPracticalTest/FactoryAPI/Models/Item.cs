﻿#nullable disable
using System;
using System.Collections.Generic;

namespace FactoryAPI.Models;

public partial class Item
{
    public required Guid Id { get; set; } = Guid.NewGuid();

    public required string Name { get; set; }

    public required string Description { get; set; }

    public required decimal Price { get; set; }
}