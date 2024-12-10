using backend.events.browse;

namespace backend.events;

public class EventService //: IEventService
{
    private readonly IEventRepository _eventRepository;

    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }
    public async Task<List<EventSummaryDto>> GetFutureEvents()
    {
        var events = await _eventRepository.GetAllEventsAsync();
        var futureEvents = events.FindAll(ev => ev.Date > DateTime.Now);
        var summaries = futureEvents.Select(ev => new EventSummaryDto(ev)).ToList();
        return summaries;
    }
}

// public interface IEventService
// {
//     public Task<List<EventSummaryDto>> GetEventSummaryDtos();
// }