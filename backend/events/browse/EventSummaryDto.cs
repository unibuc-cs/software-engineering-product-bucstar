namespace backend.events.browse;

public class EventSummaryDto(
    int id,
    string name,
    string description,
    string location,
    DateTime date,
    string organizer,
    int maximumParticipants,
    int registeredParticipants,
    string[] tags)
{
    public int Id { get; init; } = id;
    public string Name { get; init; } = name;
    public string Description { get; init; } = description;
    public string Location { get; init; } = location;
    public DateTime Date { get; init; } = date;
    public string Organizer { get; init; } = organizer;
    public int MaximumParticipants { get; init; } = maximumParticipants;
    public int RegisteredParticipants { get; init; } = registeredParticipants;
    public string[] Tags { get; init; } = tags;
}