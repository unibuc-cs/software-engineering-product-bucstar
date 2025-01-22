namespace backend.events.dto;

public class CreateReviewDto
{
    public required string UserId { get; set; }
    public required string EventId { get; set; }
    public required string Text { get; set; }
    public required int Score { get; set; }
}