using backend.events.browse;
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
        
    }
}

