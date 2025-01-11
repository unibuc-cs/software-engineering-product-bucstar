using backend.database.models;

namespace backend.events.dto;

public class CreateEventDto
{
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string Location { get; init; }
    public required string OrganizerId { get; init; }
    public required string Date { get; init; }
    public required bool ParticipantsLimitEnabled { get; init; }
    public required int ParticipantsLimit { get; init; }



    public Event AsEvent()
    {
        return new Event
        {
            Name = Name,
            Description = Description,
            Location = Location,
            OrganizerId = Guid.Empty,
            Date = DateTime.Parse(Date),  // Assuming DateString is in a valid format.
            ParticipantsLimit = (ParticipantsLimitEnabled ) ? ParticipantsLimit : 0
        };
    }
}