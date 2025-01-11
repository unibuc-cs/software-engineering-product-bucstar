using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs.UserDTOs;

public class UserDto
{
    public required Guid? Id { get; set; }
    [MaxLength(50)]
    public required string FacebookId { get; set; }
    [MaxLength(50)]
    public required string Nickname { get; set; }
}