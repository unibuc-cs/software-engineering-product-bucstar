using backend.events.browse;
using backend.events.dto;
using backend.Helpers;
using backend.Helpers.exceptions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace backend.events
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class EventController(EventService eventService, FacebookTokenValidator facebookTokenValidator) : ControllerBase
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
            if (createEventDto == null)
            {
                return BadRequest("Event data is required.");
            }
            
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }

            if (userInfo["data"]?["user_id"]?.ToString() != createEventDto.OrganizerId)
            {
                return Unauthorized("Not authorized to create event with different organizer id.");
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
        [ProducesResponseType(401)]                      // Unauthorized
        [ProducesResponseType(500)]                      // Internal Server Error
        public async Task<IActionResult> UpdateEvent([FromBody] CreateEventDto? createEventDto)
        {
            if (createEventDto == null)
            {
                return BadRequest("Event data is required.");
            }
            
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            bool isOwner = await facebookTokenValidator.IsOwner(userInfo, createEventDto.OrganizerId);
            if (!isOwner)
            {
                return Unauthorized("UserId and OrganizerId does not match.");
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

        [HttpGet("events/user/future")]
        [ProducesResponseType(typeof(List<EventSummaryDto>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetFutureEventsForUser()
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
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
        
        [HttpGet("events/user/past")]
        [ProducesResponseType(typeof(List<EventSummaryDto>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(object), 500)]
        public async Task<IActionResult> GetPastEventsForUser()
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
                var summaries = await eventService.GetPastEventsForUser(userId);
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
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            var eventDto = await eventService.GetDetailedEvent(id);

            if (eventDto == null)
            {
                return NotFound($"Event with id {id} not found.");
            }
            
            string userId = userInfo["data"]["user_id"].ToString();

            if (eventDto.OrganizerFacebookId != userId)
            {
                return Unauthorized($"User is not authorized.");
            }
            
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

        // Reviews
        
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
        [HttpGet("reviews/user")]
        [ProducesResponseType(typeof(List<ReviewDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetReviewsByUserId()
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
                var reviews = await eventService.GetAllReviewsByUserIdAsync(userId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 4. Get a specific review by user and event
        [HttpGet("reviews/{eventId}")]
        [ProducesResponseType(typeof(ReviewDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetReviewOfUserByEvent(string eventId)
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
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
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            string userId = userInfo["data"]["user_id"].ToString();

            if (dto.UserId != userId)
            {
                return Unauthorized("User is not authorized.");
            }
            
            if (dto == null || string.IsNullOrEmpty(dto.UserId) || string.IsNullOrEmpty(dto.EventId) || string.IsNullOrEmpty(dto.Text) || dto.Score <= 0)
            {
                return BadRequest(new { error = "Invalid review data." });
            }

            try
            {
                await eventService.CreateReviewAsync(dto);
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
        [HttpDelete("reviews/{eventId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteReview(string eventId)
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
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
        
        
        // Comments
        // 1. Get all comments
        [HttpGet("comments")]
        [ProducesResponseType(typeof(List<CommentDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllComments()
        {
            try
            {
                var comments = await eventService.GetAllCommentsAsync();
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 2. Get all comments for a specific event
        [HttpGet("comments/event/{eventId}")]
        [ProducesResponseType(typeof(List<CommentDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCommentsByEventId(string eventId)
        {
            try
            {
                var comments = await eventService.GetAllCommentsByEventIdAsync(eventId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 3. Get all comments by a specific user
        [HttpGet("comments/user")]
        [ProducesResponseType(typeof(List<CommentDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCommentsByUserId()
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
                var comments = await eventService.GetAllCommentsByUserIdAsync(userId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 4. Get specific comments by user and event
        [HttpGet("comments/{eventId}")]
        [ProducesResponseType(typeof(List<CommentDto>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetCommentsOfUserByEvent(string eventId)
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            try
            {
                string userId = userInfo["data"]["user_id"].ToString();
                var comments = await eventService.GetCommentsOfUserByEventAsync(userId, eventId);
                if (comments == null)
                {
                    return NotFound(new { message = "Review not found." });
                }
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        // 5. Create a comment
        [HttpPost("comments/create")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto dto)
        {
            JObject? userInfo = HttpContext.Items["UserInfo"] as JObject;

            if (userInfo == null)
            {
                return Unauthorized("User is not logged in.");
            }
            
            if (dto == null || string.IsNullOrEmpty(dto.UserId) || string.IsNullOrEmpty(dto.EventId) || string.IsNullOrEmpty(dto.Text) )
            {
                return BadRequest(new { error = "Invalid comment data." });
            }
            
            string userId = userInfo["data"]["user_id"].ToString();

            if (dto.UserId != userId)
            {
                return Unauthorized("User is not authorized.");
            }

            try
            {
                await eventService.CreateCommentAsync(dto);
                return StatusCode(201, new { message = "Comment created successfully." });
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
        
    }
}

