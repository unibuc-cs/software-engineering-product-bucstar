using backend.events.browse;

namespace backend.events;

public class EventService
{
    public List<EventSummaryDto> GetEventSummaryDtos()
    {
        var summary = new EventSummaryDto(
            1,
            "event 1",
            "description 1",
            "Bucharest",
            DateTime.Now,
            "organizer 1",
            12,
            6,
            ["sport", "outside", "casual"]
        );

        var summaries = new List<EventSummaryDto>{
            summary, summary, summary, summary
        };
        
        return summaries;
    }
}