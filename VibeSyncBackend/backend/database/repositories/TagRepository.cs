using backend.Data;
using backend.database.models;
using backend.database.repositories.generic;
using backend.events;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.database.repositories;

public class TagRepository(DatabaseContext dbContext) : GenericRepository<Tag>(dbContext), ITagRepository
{
    public async Task AddTagAsync(Tag tag)
    {
        await _table.AddAsync(tag);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveTagsByEventIdAsync(Guid eventId)
    {
        var tagsToDelete = await _table
            .Where(t => t.EventId == eventId)
            .ToListAsync();

        if (tagsToDelete.Any())
        {
            _table.RemoveRange(tagsToDelete);
            await _dbContext.SaveChangesAsync();
        }
    }
}