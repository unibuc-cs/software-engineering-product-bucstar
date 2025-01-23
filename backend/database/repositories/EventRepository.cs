using backend.Data;
using backend.database.models;
using backend.Models;
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

    public async Task<Guid> AddEvent(Event newEvent)
    {
        var temp = await _table.AddAsync(newEvent);
        await _dbContext.SaveChangesAsync();
        return temp.Entity.Id;
    }

    public async Task UpdateEvent(Event newEvent)
    {
        _table.Update(newEvent);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteEvent(Guid id)
    {
        var eventToDelete = await _table.FindAsync(id);
    
        if (eventToDelete == null)
        {
            throw new KeyNotFoundException($"Event with ID {id} not found.");
        }
        _table.Remove(eventToDelete);
        await _dbContext.SaveChangesAsync();
    }


    // Reviews
    public async Task<List<Review>> GetAllReviewsAsync()
    {
        return await _dbContext.Reviews
            .Include(r => r.User)
            .Include(r => r.Event)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<List<Review>> GetAllReviewsByEventIdAsync(Guid eventId)
    {
        return await _dbContext.Reviews
            .Where(r => r.EventId == eventId)
            .Include(r => r.User)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<List<Review>> GetReviewsByUserIdAsync(Guid userId)
    {
        return await _dbContext.Reviews
            .Where(r => r.UserId == userId)
            .Include(r => r.User)
            .AsNoTracking()
            .ToListAsync();
    }

    
    public async Task CreateReviewAsync(Review review)
    {
        // Check if the review already exists
        var existingReview = await _dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == review.UserId && r.EventId == review.EventId);

        if (existingReview != null)
        {
            throw new InvalidOperationException("A review for this event by this user already exists.");
        }

        // Add the new review
        await _dbContext.Reviews.AddAsync(review);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteReviewAsync(Guid userId, Guid eventId)
    {
        var review = await _dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.EventId == eventId);

        if (review == null)
        {
            throw new KeyNotFoundException("The review does not exist.");
        }

        _dbContext.Reviews.Remove(review);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<Review?> GetReviewOfUserByEventAsync(Guid userId, Guid eventId)
    {
        return await _dbContext.Reviews
            .Where(r => r.UserId == userId && r.EventId == eventId)
            .Include(r => r.User)
            .AsNoTracking()
            .FirstOrDefaultAsync();
    }
    
    
    // Comments
    
        public async Task<List<Comment>> GetAllCommentsAsync()
    {
        return await _dbContext.Comments
            .Include(c => c.User)
            .Include(c => c.Event)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<List<Comment>> GetAllCommentsByEventIdAsync(Guid eventId)
    {
        return await _dbContext.Comments
            .Where(c => c.EventId == eventId)
            .Include(c => c.User)
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<List<Comment>> GetCommentsByUserIdAsync(Guid userId)
    {
        return await _dbContext.Comments
            .Where(c => c.UserId == userId)
            .Include(c => c.User)
            .AsNoTracking()
            .ToListAsync();
    }

    
    public async Task CreateCommentAsync(Comment comment)
    {
        await _dbContext.Comments.AddAsync(comment);
        await _dbContext.SaveChangesAsync();
    }
    
    
    public async Task<List<Comment>> GetCommentsOfUserByEventAsync(Guid userId, Guid eventId)
    {
        return await _dbContext.Comments
            .Where(c => c.UserId == userId && c.EventId == eventId)
            .AsNoTracking()
            .ToListAsync();
    }

    

}