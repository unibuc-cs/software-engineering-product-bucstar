using backend.database.models;

namespace backend.events.browse;

public class EventSummaryDto(
    string id,
    string name,
    string description,
    string location,
    DateTime date,
    string organizer,
    int maximumParticipants,
    int registeredParticipants,
    string[] tags)
{
    public string Id { get; init; } = id;
    public string Name { get; init; } = name;
    public string Description { get; init; } = description;
    public string Location { get; init; } = location;
    public DateTime Date { get; init; } = date;
    public string Organizer { get; init; } = organizer;
    public int MaximumParticipants { get; init; } = maximumParticipants;
    public int RegisteredParticipants { get; init; } = registeredParticipants;
    public string[] Tags { get; init; } = tags;

    public EventSummaryDto(Event ev) : this(
        ev.Id.ToString(),
        ev.Name,
        ev.Description,
        ev.Location,
        ev.Date,
        ev.Organizer.Nickname,
        ev.ParticipantsLimit,
        ev.Participations.Count,
        ev.Tags.Select(t => t.Name).ToArray()
    ){ }
}