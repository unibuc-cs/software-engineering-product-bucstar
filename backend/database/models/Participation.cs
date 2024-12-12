using backend.database.models;
using backend.Models.Base;

namespace backend.Models;

public class Participation : BaseEntity
{
    public required Guid UserId { get; set; }
    public User User { get; set; }
    
    public required Guid EventId { get; set; }
    public Event Event { get; set; }
}