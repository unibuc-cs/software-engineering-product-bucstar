using backend.Models.Base;

namespace backend.Models;

public class Participation : BaseEntity
{
    public required Guid UserId { get; set; }
    public required User User { get; set; }
    
    public required Guid EventId { get; set; }
    public required Event Event { get; set; }
}