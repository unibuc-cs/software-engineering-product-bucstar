using backend.account;
using backend.events.browse;
using backend.events.dto;
using backend.Helpers.exceptions;
using backend.Models;

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

    public async Task<CreateParticipationDto?> JoinEventAsync(CreateParticipationDto createParticipationDto)
    {
        
            var user = await _userRepository.GetByFacebookIdAsync(createParticipationDto.UserId);
            if (user == null)
            {
                throw new UserNotFoundException("User not found.");
            }

            createParticipationDto.UserId = user.Id.ToString();

            var joinedEvent = await _eventRepository.GetEventAsync(Guid.Parse(createParticipationDto.EventId));
            if (joinedEvent == null)
            {
                throw new EventNotFoundException("Event not found.");
            }

            // Check if user is already a participant
            var existingParticipation = await _eventRepository.GetParticipationAsync(user.Id, joinedEvent.Id);
            if (existingParticipation != null)
            {
                throw new ParticipationException("User is already a participant in this event.");
            }

            // Check participant limit
            if (joinedEvent.ParticipantsLimit > 0 &&
                joinedEvent.Participations.Count >= joinedEvent.ParticipantsLimit)
            {
                throw new ParticipationException("Participant limit reached for this event.");
            }

            // Add participation
            var newParticipation = createParticipationDto.AsParticipation();

            await _eventRepository.AddParticipation(newParticipation);

            return createParticipationDto;
    }

}