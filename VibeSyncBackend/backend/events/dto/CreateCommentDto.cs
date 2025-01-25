namespace backend.events.dto;

public class CreateCommentDto
{
    public required string UserId { get; set; }
    public required string EventId { get; set; }
    public required string Text { get; set; }
}