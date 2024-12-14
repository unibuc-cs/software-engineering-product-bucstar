using backend.account;
using backend.database.models;
using backend.events.browse;
using backend.events.dto;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.View;

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

    public async Task<object?> GetEditEventDto(string id)
    {
        try
        {
            var model = (await _eventRepository.GetEventAsync(Guid.Parse(id)))!;
            var dto = new CreateEventDto(model)
            {
                Id = model.Id.ToString(),
                Name = model.Name,
                Description = model.Description,
                Location = model.Location,
                OrganizerId = model.OrganizerId.ToString(),
                Date = model.Date.ToLongDateString(),
                ParticipantsLimitEnabled = model.ParticipantsLimit > 0,
                ParticipantsLimit = model.ParticipantsLimit
            };
            return dto;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<object> UpdateEventAsync(CreateEventDto createEventDto)
    {
        try
        {
            var newEvent = createEventDto.AsEvent();
            var user = await _userRepository.GetByFacebookIdAsync(createEventDto.OrganizerId);
            newEvent.OrganizerId = user!.Id;
            await _eventRepository.UpdateEvent(newEvent);
            return createEventDto;
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