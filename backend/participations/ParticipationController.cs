using backend.events.dto;
using backend.Helpers.exceptions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.participations;

[Route("api/[controller]")]
[ApiController]
[EnableCors("_myAllowSpecificOrigins")]
public class ParticipationController(ParticipationService participationService) : ControllerBase
{
    [HttpPost("join")]
    [ProducesResponseType(typeof(CreateParticipationDto), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> JoinEvent([FromBody] CreateParticipationDto? createParticipationDto)
    {
        if (createParticipationDto == null || 
            string.IsNullOrEmpty(createParticipationDto.UserId) || 
            string.IsNullOrEmpty(createParticipationDto.EventId))
        {
            return BadRequest("UserId and EventId are required.");
        }

        try
        {
            var participant = await participationService.JoinEventAsync(createParticipationDto);
            return Ok(new { message = "Joined event successfully", participant });
        }
        catch (UserNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (EventNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ParticipationException ex)
        {
            return Conflict(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("unjoin")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> UnjoinEvent([FromBody] CreateParticipationDto? createParticipationDto)
    {
        if (createParticipationDto == null || 
            string.IsNullOrEmpty(createParticipationDto.UserId) || 
            string.IsNullOrEmpty(createParticipationDto.EventId))
        {
            return BadRequest("UserId and EventId are required.");
        }
        try
        {
            await participationService.UnjoinEventAsync(createParticipationDto);
            return Ok(new { message = "Unjoined event successfully" });
        }
        catch (UserNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (EventNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ParticipationException ex)
        {
            return Conflict(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}