using backend.events.browse;

namespace backend.events;

public class EventService //: IEventService
{
    private readonly IEventRepository _eventRepository;

    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }
    public async Task<List<EventSummaryDto>> GetEventSummaryDtos()
    {
        var events = await _eventRepository.GetAllEventsAsync();
        var summaries = events.Select(ev => new EventSummaryDto(ev)).ToList();
        return summaries;
    }
}

// public interface IEventService
// {
//     public Task<List<EventSummaryDto>> GetEventSummaryDtos();
// }