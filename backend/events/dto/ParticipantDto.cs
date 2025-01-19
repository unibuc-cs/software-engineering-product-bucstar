using backend.Models;

namespace backend.events.browse;

public class ParticipantDto(
    string username,
    string facebookId
) {
    public string Username { get; init; } = username;
    public string FacebookId { get; init; } = facebookId;

    public ParticipantDto(Participation participation)
        : this(participation.User.Nickname, participation.User.FacebookId)
    {
        
    }
}