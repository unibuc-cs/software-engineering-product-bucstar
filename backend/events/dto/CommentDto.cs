using backend.Models;

namespace backend.events.browse;

public class CommentDto(
    string username,
    string text
) {
    public string Username { get; init; } = username;
    public string Text { get; init; } = text;

    public CommentDto(Comment comment) : this(
        comment.User.Nickname,
        comment.Text
    )
    {
    }
}