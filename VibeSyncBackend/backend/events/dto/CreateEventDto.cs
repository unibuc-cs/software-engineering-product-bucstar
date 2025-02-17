using backend.database.models;
using backend.Models;

public class CreateEventDto
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string Location { get; init; }
    public required string OrganizerId { get; init; }
    public required string Date { get; init; }
    public required bool ParticipantsLimitEnabled { get; init; }
    public required int ParticipantsLimit { get; init; }
    
    public required string[] Tags { get; init; }

    // Remove the parameterized constructor
    // If you need to create the object in other places, use the default constructor
    public CreateEventDto() { }

    // Optional: Constructor for mapping from Event object
    public CreateEventDto(Event ev)
    {
        Id = ev.Id.ToString();
        Name = ev.Name;
        Description = ev.Description;
        Location = ev.Location;
        OrganizerId = ev.Organizer.Id.ToString();
        Date = ev.Date.ToLongDateString();
        ParticipantsLimitEnabled = ev.ParticipantsLimit > 0;
        ParticipantsLimit = ev.ParticipantsLimit;
        Tags = ev.Tags.Select(x => x.Name).ToArray();
    }

    public Event AsEvent()
    {
        return new Event
        {
            Id = (Id == "") ? Guid.Empty: Guid.Parse(Id),
            Name = Name,
            Description = Description,
            Location = Location,
            OrganizerId = Guid.Empty,
            Date = DateTime.Parse(Date), 
            ParticipantsLimit = (ParticipantsLimitEnabled) ? ParticipantsLimit : 0,
            Tags = Tags.Select(tag => new Tag
            {
                Name = tag, 
                EventId = (Id == "") ? Guid.Empty: Guid.Parse(Id)
            }).ToArray()
        };
    }
}