using backend.Models;

namespace backend.events.dto;

public class ReviewDto(
    string username,
    int score, 
    string text
) {
    public string Username { get; init; } = username;
    public int Score { get; init; } = score;
    public string Text { get; init; } = text;
    
    public ReviewDto(Review review)
        : this(
            review.User.Nickname,
            review.Score,
            review.Text
            ) {}
}