using System.ComponentModel.DataAnnotations;
using backend.Models.Base;

namespace backend.Models;

public class Notification : BaseEntity
{
    [MaxLength(255)]
    public required string Text { get; set; }
    public bool? Seen { get; set; } 
    
    public required Guid UserId { get; set; }
    public required User User { get; set; }
}