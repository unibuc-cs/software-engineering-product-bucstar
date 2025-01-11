using backend.Data;
using backend.database.models;
using backend.database.repositories.generic;
using backend.events;
using Microsoft.EntityFrameworkCore;

namespace backend.database.repositories;

public class EventRepository(DatabaseContext dbContext) : GenericRepository<Event>(dbContext), IEventRepository
{
    public async Task<List<Event>> GetAllEventsAsync()
    {
        return await _table
            .AsNoTracking()
            .Include(ev => ev.Organizer)
            .Include(ev => ev.Tags)
            .Include(ev => ev.Participations)
            .ToListAsync();
    }

    public async Task<Event?> GetEventAsync(Guid id)
    {
        return await _table
            .Include(ev => ev.Organizer)
            .Include(ev => ev.Tags)
            .Include(ev => ev.Participations)
            .ThenInclude(participation => participation.User)
            .Include(ev => ev.Reviews)
            .ThenInclude(review => review.User)
            .Include(ev => ev.Comments)
            .ThenInclude(comment => comment.User)
            .FirstOrDefaultAsync(ev => ev.Id == id);
    }
}