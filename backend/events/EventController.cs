using backend.events.dto;
using backend.Helpers.exceptions;
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
        
        [HttpPut("events/edit/update")]
        [ProducesResponseType(typeof(CreateEventDto), 201)]   // Success, return created event details
        [ProducesResponseType(400)]                      // Bad Request if validation fails
        [ProducesResponseType(500)]                      // Internal Server Error
        public async Task<IActionResult> UpdateEvent([FromBody] CreateEventDto? createEventDto)
        {
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
                
                var createdEvent = await eventService.UpdateEventAsync(createEventDto);

                return Ok(new
                {
                    message = "Event updated successfully",
                    ev = createdEvent
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
        [HttpGet("events/edit/{id}")]
        [ProducesResponseType(typeof(CreateEventDto), 200)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetEditingEvent(string id)
        {
            try
            {
                var dto = (await eventService.GetEditEventDto(id))!;
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("events/user/{userId}/future")]
        [ProducesResponseType(typeof(List<EventSummaryDto>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetFutureEventsForUser(string userId)
        {
            try
            {
                var summaries = await eventService.GetFutureEventsForUser(userId);
                return Ok(summaries);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            } 
        }
        
        [HttpDelete("events/delete/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            try
            {
                var success = await eventService.DeleteEventAsync(id);

                if (success)
                {
                    return Ok(new { message = "Event deleted successfully." });
                }
                else
                {
                    return StatusCode(500, "Failed to delete the event.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"An unexpected error occurred: {ex.Message}" });
            }
        }

        
        // 1. Get all reviews
        [HttpGet("reviews")]
        [ProducesResponseType(typeof(List<ReviewDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllReviews()
        {
            try
            {
                var reviews = await eventService.GetAllReviewsAsync();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 2. Get all reviews for a specific event
        [HttpGet("reviews/event/{eventId}")]
        [ProducesResponseType(typeof(List<ReviewDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetReviewsByEventId(string eventId)
        {
            try
            {
                var reviews = await eventService.GetAllReviewsByEventIdAsync(eventId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 3. Get all reviews by a specific user
        [HttpGet("reviews/user/{userId}")]
        [ProducesResponseType(typeof(List<ReviewDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetReviewsByUserId(string userId)
        {
            try
            {
                var reviews = await eventService.GetAllReviewsByUserIdAsync(userId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 4. Get a specific review by user and event
        [HttpGet("reviews/{userId}/{eventId}")]
        [ProducesResponseType(typeof(ReviewDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetReviewOfUserByEvent(string userId, string eventId)
        {
            try
            {
                var review = await eventService.GetReviewOfUserByEventAsync(userId, eventId);
                if (review == null)
                {
                    return NotFound(new { message = "Review not found." });
                }
                return Ok(review);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 5. Create a review
        [HttpPost("reviews/create")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.UserId) || string.IsNullOrEmpty(dto.EventId) || string.IsNullOrEmpty(dto.Text) || dto.Score < 0)
            {
                return BadRequest(new { error = "Invalid review data." });
            }

            try
            {
                await eventService.CreateReviewAsync(dto.UserId, dto.EventId, dto.Text, dto.Score);
                return StatusCode(201, new { message = "Review created successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 6. Delete a review
        [HttpDelete("reviews/{userId}/{eventId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteReview(string userId, string eventId)
        {
            try
            {
                await eventService.DeleteReviewAsync(userId, eventId);
                return Ok(new { message = "Review deleted successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    
        
        
    }
}

