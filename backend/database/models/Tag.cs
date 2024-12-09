using System.ComponentModel.DataAnnotations;
using backend.database.models;
using backend.Models.Base;

namespace backend.Models;

public class Tag : BaseEntity
{
    [MaxLength(31)]
    public required string Name { get; set; }
    
    public required int EventId { get; set; }
    public required Event Event { get; set; }
}