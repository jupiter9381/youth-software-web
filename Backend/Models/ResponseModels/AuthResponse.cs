using System.Text.Json.Serialization;
using Youth.DtOs;

namespace Youth.Models.ResponseModels
{
    public class AuthResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public string JwtToken { get; set; }
        //[JsonIgnore]
        //public string RefreshToken { get; set; }

        public AuthResponse(User user, string jwtToken) {
            Id = user.Id;
            Username = user.Username;
            Email = user.Email;
            JwtToken = jwtToken;
            //RefreshToken = refreshToken;
        }
    }
}
