using backend.database.models;
using backend.events.browse;

namespace backend.events.dto;

public class EventDetailedDto(
    string id,
    string name,
    string description,
    string location,
    DateTime date,
    string organizer,
    int maximumParticipants,
    List<ParticipantDto> participants,
    List<ReviewDto> reviews,
    List<CommentDto> comments
)
{
    public string Id { get; init; } = id;
    public string Name { get; init; } = name;
    public string Description { get; init; } = description;
    public string Location { get; init; } = location;
    public DateTime Date { get; init; } = date;
    public string Organizer { get; init; } = organizer;
    public int MaximumParticipants { get; init; } = maximumParticipants;
    public List<ParticipantDto> Participants { get; init; } = participants;
    public List<ReviewDto> Reviews { get; init; } = reviews;
    public List<CommentDto> Comments { get; init; } = comments;
    
    public EventDetailedDto(Event ev)
    :this(
        ev.Id.ToString(), 
        ev.Name, 
        ev.Description, 
        ev.Location,
        ev.Date, 
        ev.Organizer.Nickname,
        ev.ParticipantsLimit,
        ev.Participations.Select(p => new ParticipantDto(p)).ToList(),
        ev.Reviews.Select(r => new ReviewDto(r)).ToList(),
        ev.Comments.Select(c => new CommentDto(c)).ToList()
    ){
        
    }
}