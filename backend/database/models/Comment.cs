using System.ComponentModel.DataAnnotations;
using backend.database.models;
using backend.Models.Base;

namespace backend.Models;

public class Comment : BaseEntity
{
    [MaxLength(2000)]
    public required string Text { get; set; }
    
    public required Guid UserId { get; set; }
    public User User { get; set; }
    
    public required Guid EventId { get; set; }
    public Event Event { get; set; }
}