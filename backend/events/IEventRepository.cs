using backend.database.models;

namespace backend.events;

public interface IEventRepository
{ 
    Task<List<Event>> GetAllEventsAsync();
}