using backend.database.models;
using backend.Models;

namespace backend.events;

public interface IEventRepository
{ 
    Task<List<Event>> GetAllEventsAsync();
    Task<Event?> GetEventAsync(Guid id);
    Task<Participation?> GetParticipationAsync(Guid userId, Guid eventId);
    Task AddEvent(Event newEvent);
    Task AddParticipation(Participation participation);
    Task UpdateEvent(Event newEvent);
}