using backend.database.models;
using backend.Models;

namespace backend.events;

public interface IEventRepository
{ 
    Task<List<Event>> GetAllEventsAsync();
    Task<Event?> GetEventAsync(Guid id);
    Task AddEvent(Event newEvent);
    Task UpdateEvent(Event newEvent);
    Task DeleteEvent(Guid id);
}