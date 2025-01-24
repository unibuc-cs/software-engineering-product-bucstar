using Newtonsoft.Json.Linq;

namespace backend.Helpers;

public class FacebookTokenValidator
{
    private const string FacebookGraphApiUrl = "https://graph.facebook.com/debug_token";
    private readonly string _appAccessToken;
    
    public FacebookTokenValidator(IConfiguration configuration)
    {
        _appAccessToken = configuration["APP_ACCESS_TOKEN"];
    }

    /// <summary>
    /// Fetches the user info from Facebook's debug_token endpoint.
    /// </summary>
    /// <param name="userAccessToken">The user's access token.</param>
    /// <returns>A JObject containing the user info, or null if the token is invalid.</returns>
    public async Task<JObject?> GetUserInfo(string userAccessToken)
    {
        using (var httpClient = new HttpClient())
        {
            var requestUrl = $"{FacebookGraphApiUrl}?input_token={userAccessToken}&access_token={_appAccessToken}";
            var response = await httpClient.GetAsync(requestUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var json = JObject.Parse(responseData);

                bool isValid = json["data"]?["is_valid"]?.ToObject<bool>() ?? false;
                string userId = json["data"]?["user_id"]?.ToString();

                if (isValid && !string.IsNullOrEmpty(userId))
                {
                    return json;
                }
            }
        }
        return null;
    }
    
    /// <summary>
    /// Checks if the token is valid.
    /// </summary>
    /// <param name="userInfo">The facebook request's response in JSON about user's info.</param>
    /// <returns>True if the token is not expired, otherwise false.</returns>
    public async Task<bool> IsTokenValid(JObject userInfo)
    {
        return userInfo["data"]?["is_valid"]?.ToObject<bool>() ?? false;
    }
    
    /// <summary>
    /// Checks if the userId in the token matches the given userId.
    /// </summary>
    /// <param name="userInfo">The facebook request's response in JSON about user's info.</param>
    /// <param name="userId">The userId to compare against.</param>
    /// <returns>True if the userIds match, otherwise false.</returns>
    public async Task<bool> IsOwner(JObject userInfo, string userId)
    {
        var tokenUserId = userInfo["data"]?["user_id"]?.ToString();
        return tokenUserId == userId;
    }
}