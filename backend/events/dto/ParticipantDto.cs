using backend.Models;

namespace backend.events.browse;

public class ParticipantDto(
    string username
) {
    public string Username { get; init; } = username;

    public ParticipantDto(Participation participation)
        : this(participation.User.Nickname)
    {
        
    }
}