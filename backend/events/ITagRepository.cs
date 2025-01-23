using backend.Models;

namespace backend.events;

public interface ITagRepository
{
    Task AddTagAsync(Tag tag);
    Task RemoveTagsByEventIdAsync(Guid eventId);
}