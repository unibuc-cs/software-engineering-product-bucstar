using backend.Models.Base;

namespace backend.Models;

public class User : BaseEntity
{
    public required string Nickname { get; set; }
    
    public ICollection<Notification>? Notifications { get; set; }
    public ICollection<Event>? CreatedEvents { get; set; }
    public ICollection<Participation>? Participations { get; set; }
    public ICollection<Comment>? Comments { get; set; }
    public ICollection<Review>? Reviews { get; set; }
}