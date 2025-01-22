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
    
    Task<List<Review>> GetAllReviewsAsync();
    Task<List<Review>> GetAllReviewsByEventIdAsync(Guid eventId);
    Task<List<Review>> GetReviewsByUserIdAsync(Guid userId);
    Task CreateReviewAsync(Review review);
    Task DeleteReviewAsync(Guid userId, Guid eventId);
    Task<Review?> GetReviewOfUserByEventAsync(Guid userId, Guid eventId);
    
    Task<List<Comment>> GetAllCommentsAsync();
    Task<List<Comment>> GetAllCommentsByEventIdAsync(Guid eventId);
    Task<List<Comment>> GetCommentsByUserIdAsync(Guid userId);
    Task CreateCommentAsync(Comment comment);
    Task<List<Comment>> GetCommentsOfUserByEventAsync(Guid userId, Guid eventId);


}