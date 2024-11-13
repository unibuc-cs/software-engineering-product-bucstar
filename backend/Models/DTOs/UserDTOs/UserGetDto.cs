namespace backend.Models.DTOs.UserDTOs;

public class UserGetDto
{
    public required Guid Id { get; set; }
    public required string Nickname { get; set; }
}