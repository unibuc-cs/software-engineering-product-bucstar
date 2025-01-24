using backend.account;
using backend.events.dto;
using backend.Helpers.exceptions;
using backend.participations;
using backend.Models;
using backend.database.models;
using backend.events.browse;

namespace backend.events;

public class EventService
{
    private readonly IParticipationRepository _participationRepository;
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITagRepository _tagRepository;

    public EventService(
        IParticipationRepository participationRepository,
        IEventRepository eventRepository,
        IUserRepository userRepository,
        ITagRepository tagRepository
        )
    {
        _participationRepository = participationRepository;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _tagRepository = tagRepository;
    }
    public async Task<List<EventSummaryDto>> GetFutureEvents()
    {
        var events = await _eventRepository.GetAllEventsAsync();
        var futureEvents = events.FindAll(ev => ev.Date > DateTime.Now);
        var summaries = futureEvents.Select(ev => new EventSummaryDto(ev)).ToList();
        return summaries;
    }

    public async Task<List<EventSummaryDto>> GetFutureEventsForUser(string userId)
    {
        var user = await _userRepository.GetByFacebookIdAsync(userId);
        if (user is null)
        {
            throw new UserNotFoundException("User not found");
        }
        var userRegisteredEvents = await _participationRepository.GetFutureUserParticipations(user.Id);
        var futureEvents = userRegisteredEvents
            .Select(p => p.Event)
            .ToList();
        var summaries = futureEvents.Select(ev => new EventSummaryDto(ev)).ToList();
        return summaries;
    }
    
    public async Task<List<EventSummaryDto>> GetPastEventsForUser(string userId)
    {
        var user = await _userRepository.GetByFacebookIdAsync(userId);
        if (user is null)
        {
            throw new UserNotFoundException("User not found");
        }
        var userRegisteredEvents = await _participationRepository.GetPastUserParticipations(user.Id);
        var pastEvents = userRegisteredEvents
            .Select(p => p.Event)
            .ToList();
        var summaries = pastEvents.Select(ev => new EventSummaryDto(ev)).ToList();
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
            
            var eventId = await _eventRepository.AddEvent(newEvent);
            
            for (int i = 0; i < newEvent.Tags.Count; i++)
            {
                var tag = newEvent.Tags.ElementAt(i);
                tag.EventId = eventId;
                var id = _tagRepository.AddTagAsync(tag);
            }
            
            
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
                ParticipantsLimit = model.ParticipantsLimit,
                Tags = model.Tags.Select(t => t.Name).ToArray(),
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
            
            await _tagRepository.RemoveTagsByEventIdAsync(newEvent.Id);
            for (int i = 0; i < newEvent.Tags.Count; i++)
            {
                var id = _tagRepository.AddTagAsync(newEvent.Tags.ElementAt(i));
            }
            
            await _eventRepository.UpdateEvent(newEvent);
            return createEventDto;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
    public async Task<bool> DeleteEventAsync(string id)
    {
        try
        {
            var eventId = Guid.Parse(id);
            
            await _tagRepository.RemoveTagsByEventIdAsync(eventId);
            await _eventRepository.DeleteEvent(eventId);

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    
    
    // Reviews
    public async Task<List<ReviewDto>> GetAllReviewsAsync()
    {
        var reviews = await _eventRepository.GetAllReviewsAsync();
        return reviews.Select(r => new ReviewDto(r)).ToList();
    }

    public async Task<List<ReviewDto>> GetAllReviewsByEventIdAsync(string eventId)
    {
        var eventGuid = Guid.Parse(eventId);
        var reviews = await _eventRepository.GetAllReviewsByEventIdAsync(eventGuid);
        return reviews.Select(r => new ReviewDto(r)).ToList();
    }

    public async Task<List<ReviewDto>> GetAllReviewsByUserIdAsync(string userId)
    {
        var userGuid = Guid.Parse(userId);
        var reviews = await _eventRepository.GetReviewsByUserIdAsync(userGuid);
        return reviews.Select(r => new ReviewDto(r)).ToList();
    }

    public async Task<ReviewDto?> GetReviewOfUserByEventAsync(string userId, string eventId)
    {
        var user = await _userRepository.GetByFacebookIdAsync(userId);
        var userGuid = user!.Id;
        var eventGuid = Guid.Parse(eventId);
        var review = await _eventRepository.GetReviewOfUserByEventAsync(userGuid, eventGuid);

        return review != null ? new ReviewDto(review) : null;
    }
    
    public async Task CreateReviewAsync(CreateReviewDto createReviewDto)
    {
        var user = await _userRepository.GetByFacebookIdAsync(createReviewDto.UserId);
        var userGuid = user!.Id;
        var eventGuid = Guid.Parse(createReviewDto.EventId);

        // Check if the user and event exist
        var ev = await _eventRepository.GetEventAsync(eventGuid);
        if (user == null || ev == null)
        {
            throw new KeyNotFoundException("User or Event not found.");
        }

        var review = new Review
        {
            UserId = userGuid,
            EventId = eventGuid,
            Text = createReviewDto.Text,
            Score = createReviewDto.Score,
            DateCreated = DateTime.UtcNow,
            LastModified = DateTime.UtcNow
        };

        await _eventRepository.CreateReviewAsync(review);
    }

    
    public async Task DeleteReviewAsync(string userId, string eventId)
    {
        var user = await _userRepository.GetByFacebookIdAsync(userId);
        var userGuid = user!.Id;
        var eventGuid = Guid.Parse(eventId);

        await _eventRepository.DeleteReviewAsync(userGuid, eventGuid);
    }
    
    
    
    
    
    // Comments
    public async Task<List<CommentDto>> GetAllCommentsAsync()
    {
        var comments = await _eventRepository.GetAllCommentsAsync();
        return comments.Select(c => new CommentDto(c)).ToList();
    }

    public async Task<List<CommentDto>> GetAllCommentsByEventIdAsync(string eventId)
    {
        var eventGuid = Guid.Parse(eventId);
        var comments = await _eventRepository.GetAllCommentsByEventIdAsync(eventGuid);
        return comments.Select(c => new CommentDto(c)).ToList();
    }

    public async Task<List<CommentDto>> GetAllCommentsByUserIdAsync(string userId)
    {
        var userGuid = Guid.Parse(userId);
        var comments = await _eventRepository.GetCommentsByUserIdAsync(userGuid);
        return comments.Select(c => new CommentDto(c)).ToList();
    }

    public async Task<List<CommentDto>?> GetCommentsOfUserByEventAsync(string userId, string eventId)
    {
        var userGuid = Guid.Parse(userId);
        var eventGuid = Guid.Parse(eventId);
        var comments = await _eventRepository.GetCommentsByUserIdAsync(userGuid);

        if (!comments.Any())
        {
            return null;
        }
        
        return comments.Select(c => new CommentDto(c)).ToList();
    }

    
    public async Task CreateCommentAsync(CreateCommentDto createCommentDto)
    {
        var user = await _userRepository.GetByFacebookIdAsync(createCommentDto.UserId);
        var userGuid = user!.Id;
        var eventGuid = Guid.Parse(createCommentDto.EventId);

        // Check if the user and event exist
        var ev = await _eventRepository.GetEventAsync(eventGuid);
        if (user == null || ev == null)
        {
            throw new KeyNotFoundException("User or Event not found.");
        }

        var comment = new Comment()
        {
            UserId = userGuid,
            EventId = eventGuid,
            Text = createCommentDto.Text,
            DateCreated = DateTime.UtcNow,
            LastModified = DateTime.UtcNow
        };

        await _eventRepository.CreateCommentAsync(comment);
    }
    
}

