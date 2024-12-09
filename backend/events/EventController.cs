using backend.events.browse;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.events
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class EventController: ControllerBase
    {
        [HttpGet("events/all")]
        [ProducesResponseType(typeof(EventSummaryDto), 200)]
        public async Task<IActionResult> GetAllEvents()
        {
            var summary = new EventSummaryDto(
                1,
                "event 1",
                "description 1",
                "Bucharest",
                DateTime.Now,
                "organizer 1",
                12,
                6,
                ["sport", "outside", "casual"]
            );

            var summaries = new List<EventSummaryDto>{
                summary, summary, summary, summary
            };
            
            return Ok(summaries);
        }
        
    }
}

