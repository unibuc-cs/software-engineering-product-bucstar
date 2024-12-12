using backend.account.dto;

namespace backend.Models.DTOs.UserDTOs;

public class RegisterDto
{
    public string Message { get; set; } 
    public UserDto User { get; set; }
}