using System.ComponentModel.DataAnnotations;

namespace Youth.Models.RequestModels
{
    public class AuthSignUpRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
    }
}
