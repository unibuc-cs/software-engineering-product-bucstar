using backend.account;
using backend.database.models;
using backend.events.browse;
using backend.events.dto;

namespace backend.events;

public class EventService //: IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;

    public EventService(
        IEventRepository eventRepository,
        IUserRepository userRepository
        )
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
    }
    public async Task<List<EventSummaryDto>> GetFutureEvents()
    {
        var events = await _eventRepository.GetAllEventsAsync();
        var futureEvents = events.FindAll(ev => ev.Date > DateTime.Now);
        var summaries = futureEvents.Select(ev => new EventSummaryDto(ev)).ToList();
        return summaries;
    }

    public async Task<EventDetailedDto?> GetDetailedEvent(string id)
    {
        var ev = await _eventRepository.GetEventAsync(Guid.Parse(id));
        if (ev != null)
            return new EventDetailedDto(ev);
        return null;
    }

    public async Task<CreateEventDto?> CreateEventAsync(CreateEventDto dto)
    {
        try
        {
            var newEvent = dto.AsEvent();
            var user = await _userRepository.GetByFacebookIdAsync(dto.OrganizerId);
            newEvent.OrganizerId = user!.Id;
            await _eventRepository.AddEvent(newEvent);
            return dto;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}

// public interface IEventService
// {
//     public Task<List<EventSummaryDto>> GetEventSummaryDtos();
// }