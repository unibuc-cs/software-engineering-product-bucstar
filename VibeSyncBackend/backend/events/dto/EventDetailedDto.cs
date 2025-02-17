using backend.database.models;
using backend.events.browse;

namespace backend.events.dto;

public class EventDetailedDto(
    string id,
    string name,
    string description,
    string location,
    DateTime date,
    string organizerFacebookId,
    string organizer,
    int maximumParticipants,
    List<TagDto> tags,
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
    public string OrganizerFacebookId { get; init; } = organizerFacebookId;
    public string Organizer { get; init; } = organizer;
    public int MaximumParticipants { get; init; } = maximumParticipants;
    public List<TagDto> Tags { get; init; } = tags;
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
        ev.Organizer.FacebookId,
        ev.Organizer.Nickname,
        ev.ParticipantsLimit,
        ev.Tags.Select(t => new TagDto(t)).ToList(),
        ev.Participations.Select(p => new ParticipantDto(p)).ToList(),
        ev.Reviews.Select(r => new ReviewDto(r)).ToList(),
        ev.Comments.Select(c => new CommentDto(c)).ToList()
    ){
        
    }
}