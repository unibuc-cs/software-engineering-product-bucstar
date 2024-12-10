using backend.Data;
using backend.database.models;
using backend.database.repositories.generic;
using backend.events;

namespace backend.database.repositories;

public class EventRepository(DatabaseContext dbContext) : GenericRepository<Event>(dbContext), IEventRepository
{
    public async Task<List<Event>> GetAllEventsAsync()
    {
        return await GetAllAsync();
    }
}