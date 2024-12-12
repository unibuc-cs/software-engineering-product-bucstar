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
    }
}

