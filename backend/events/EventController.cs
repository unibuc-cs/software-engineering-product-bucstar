using backend.database.models;
using backend.events.browse;
using backend.events.dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.events
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class EventController(EventService eventService) : ControllerBase
    {
        [HttpGet("events/browse")]
        [ProducesResponseType(typeof(EventSummaryDto), 200)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetFutureEvents()
        {
            try
            {
                var summaries = await eventService.GetFutureEvents();
                return Ok(summaries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet("events/{id}")]
        [ProducesResponseType(typeof(EventDetailedDto), 200)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetEvent(string id)
        {
            try
            {
                var eventDetailedDto = (await eventService.GetDetailedEvent(id))!;
                return Ok(eventDetailedDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpPost("events/create")]
        [ProducesResponseType(typeof(CreateEventDto), 201)]   // Success, return created event details
        [ProducesResponseType(400)]                      // Bad Request if validation fails
        [ProducesResponseType(500)]                      // Internal Server Error
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto? createEventDto)
        {
            Console.WriteLine(createEventDto);
            if (createEventDto == null)
            {
                return BadRequest("Event data is required.");
            }

            try
            {
                if (string.IsNullOrEmpty(createEventDto.Name) || string.IsNullOrEmpty(createEventDto.Description) ||
                    string.IsNullOrEmpty(createEventDto.Location) || string.IsNullOrEmpty(createEventDto.Date))
                {
                    return BadRequest("Name, description, location, and date are required.");
                }
                
                var createdEvent = await eventService.CreateEventAsync(createEventDto);

                return Ok(new
                {
                    message = "Event created successfully",
                    ev = createdEvent
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
    }
}

