using Newtonsoft.Json.Linq;
using backend.Helpers;

namespace backend.middlewares
{
    public class FacebookAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public FacebookAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Skip token validation for public endpoints
            if (context.Request.Path.StartsWithSegments("/api/User") || context.Request.Path.StartsWithSegments("/api/Event/events/browse"))
            {
                await _next(context);
                return;
            }

            // Check for the Authorization header
            if (!context.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Authorization header is missing.");
                return;
            }

            var token = authHeader.ToString().Replace("Bearer ", "");

            var facebookTokenValidator = context.RequestServices.GetRequiredService<FacebookTokenValidator>();
            // Validate the token
            JObject? userInfo = await facebookTokenValidator.GetUserInfo(token);
            if (userInfo == null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid token.");
                return;
            }

            bool isValid = await facebookTokenValidator.IsTokenValid(userInfo);
            if (!isValid)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Expired token.");
                return;
            }

            // Attach user info to HttpContext for use in controllers
            context.Items["UserInfo"] = userInfo;

            // Call the next middleware in the pipeline
            await _next(context);
        }
    }
}