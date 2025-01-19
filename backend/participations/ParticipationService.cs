using backend.account;
using backend.events;
using backend.events.dto;
using backend.Helpers.exceptions;

namespace backend.participations;

public class ParticipationService(IUserRepository userRepository, IEventRepository eventRepository, IParticipationRepository participationRepository)
{
    public async Task<CreateParticipationDto?> JoinEventAsync(CreateParticipationDto createParticipationDto)
    {
        
        var user = await userRepository.GetByFacebookIdAsync(createParticipationDto.UserId);
        if (user == null)
        {
            throw new UserNotFoundException("User not found.");
        }

        createParticipationDto.UserId = user.Id.ToString();

        var joinedEvent = await eventRepository.GetEventAsync(Guid.Parse(createParticipationDto.EventId));
        if (joinedEvent == null)
        {
            throw new EventNotFoundException("Event not found.");
        }

        // Check if user is already a participant
        var existingParticipation = await participationRepository.GetParticipationAsync(user.Id, joinedEvent.Id);
        if (existingParticipation != null)
        {
            throw new ParticipationException("User is already a participant in this event.");
        }

        // Check participant limit
        if (joinedEvent.ParticipantsLimit > 0 &&
            joinedEvent.Participations.Count >= joinedEvent.ParticipantsLimit)
        {
            throw new ParticipationException("Participant limit reached for this event.");
        }

        // Add participation
        var newParticipation = createParticipationDto.AsParticipation();

        await participationRepository.AddParticipation(newParticipation);

        return createParticipationDto;
    }

}