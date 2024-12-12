using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs.UserDTOs;

public class UserRegisterDto
{
    [MaxLength(50)]
    public required string FacebookId { get; set; }
    [MaxLength(50)]
    public required string Nickname { get; set; }
}