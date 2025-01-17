using backend.Models;

namespace backend.participations;

public interface IParticipationRepository
{
    Task<Participation?> GetParticipationAsync(Guid userId, Guid eventId);
    Task AddParticipation(Participation participation);
}