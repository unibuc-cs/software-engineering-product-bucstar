using backend.Models;

namespace backend.events.dto;

public class CreateParticipationDto
{
    public required string UserId { get; set; }
    public required string EventId { get; set; }

    public Participation AsParticipation()
    {
        return new Participation()
        {
            UserId = Guid.Parse(UserId),
            EventId = Guid.Parse(EventId)
        };
    }
}