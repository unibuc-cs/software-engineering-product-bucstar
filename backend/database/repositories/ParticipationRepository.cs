using backend.Data;
using backend.database.repositories.generic;
using backend.Models;
using backend.participations;
using Microsoft.EntityFrameworkCore;

namespace backend.database.repositories;

public class ParticipationRepository(DatabaseContext dbContext) : GenericRepository<Participation>(dbContext), IParticipationRepository
{
    public async Task<List<Participation>> GetAllUserParticipations(Guid userId)
    {
        return await _table
            .AsNoTracking()
            .Include(participation => participation.Event)
            .ThenInclude(ev => ev.Organizer)
            .Include(participation => participation.Event)
            .ThenInclude(ev => ev.Tags)
            .Where(participation => participation.UserId == userId)
            .ToListAsync();
    }

    public async Task<List<Participation>> GetFutureUserParticipations(Guid userId)
    {
        return await _table
            .AsNoTracking()
            .Include(participation => participation.Event)
            .ThenInclude(ev => ev.Organizer)
            .Include(participation => participation.Event)
            .ThenInclude(ev => ev.Tags)
            .Where(participation => participation.UserId == userId && participation.Event.Date > DateTime.Now)
            .ToListAsync();
    }

    public async Task<Participation?> GetParticipationAsync(Guid userId, Guid eventId)
    {
        return await _table
            .AsNoTracking()
            .Include(participation => participation.User)
            .Include(participation => participation.Event)
            .FirstOrDefaultAsync(participation => participation.UserId == userId && participation.EventId == eventId);
    }
    public async Task AddParticipation(Participation newParticipation)
    {
        await _table.AddAsync(newParticipation);
        await _dbContext.SaveChangesAsync();
    }
}