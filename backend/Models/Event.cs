using System.ComponentModel.DataAnnotations;
using backend.Models.Base;

namespace backend.Models;

public class Event : BaseEntity
{
    [MaxLength(255)]
    public required string Name { get; set; }
    
    [MaxLength(2000)]
    public required string Description { get; set; }
    
    [MaxLength(255)]
    public required string Location { get; set; }
    
    public required DateTime Date { get; set; }
    public required int ParticipantsLimit { get; set; }
    
    public required Guid OrganizerId { get; set; }
    public required User Organizer { get; set; }
    
    public ICollection<Comment>? Comments { get; set; }
    public ICollection<Tag>? Tags { get; set; }
    public ICollection<Participation>? Participations { get; set; }
    public ICollection<Review>? Reviews { get; set; }
}