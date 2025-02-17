using backend.account.dto;
using backend.Models.DTOs.UserDTOs;
using backend.Services.UserService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.account
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(RegisterDto), 200)]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            var createdUser = await _userService.RegisterUser(userDto);
            
            return Ok(new
            {
                message = "Registration successful", 
                user = createdUser
            });
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(UserDto), 200)]
        [ProducesResponseType(typeof(object), 400)]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            try
            {
                return Ok(await _userService.GetUserById(userId));
            } 
            catch (Exception)
            {
                return BadRequest($"User with ID: {userId} was not found.");
            }
        }
        
        [HttpGet("user")]
        [ProducesResponseType(typeof(UserDto), 200)]
        [ProducesResponseType(typeof(object), 400)]
        public async Task<IActionResult> GetUserByFacebookId([FromQuery(Name = "facebookId")] string facebookId)
        {
            try
            {
                return Ok(await _userService.GetUserByFacebookId(facebookId));
            } 
            catch (Exception)
            {
                return BadRequest($"User with ID: {facebookId} was not found.");
            }
        }

        [HttpGet("all")]
        [ProducesResponseType(typeof(UserDto), 200)]
        public async Task<IActionResult> Get()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
    }
}
