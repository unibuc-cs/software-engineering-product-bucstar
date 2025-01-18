using backend.Models;

namespace backend.participations;

public interface IParticipationRepository
{
    Task<List<Participation>> GetAllUserParticipations(Guid userId);
    Task<List<Participation>> GetFutureUserParticipations(Guid userId);
    Task<Participation?> GetParticipationAsync(Guid userId, Guid eventId);
    Task AddParticipation(Participation participation);
    Task RemoveParticipation(Guid userId, Guid eventId);
}