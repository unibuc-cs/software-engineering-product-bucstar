using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;
using backend.Models.Base;

namespace backend.database.models;

public class Event: BaseEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    [MaxLength(255)]
    public required string Name { get; set; }
    
    [MaxLength(2000)]
    public required string Description { get; set; }
    
    [MaxLength(255)]
    public required string Location { get; set; }
    
    public required DateTime Date { get; set; }
    public required int ParticipantsLimit { get; set; }
    
    public required Guid OrganizerId { get; set; }
    public User Organizer { get; set; }
    
    public ICollection<Comment> Comments { get; set; }
    public ICollection<Tag> Tags { get; set; }
    public ICollection<Participation> Participations { get; set; }
    public ICollection<Review> Reviews { get; set; }
}