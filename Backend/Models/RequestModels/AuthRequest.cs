using System.ComponentModel.DataAnnotations;

namespace Youth.Models.RequestModels
{
    public class AuthRequest
    {
        [Required]
        public string UserName { get; set; }
        [Required] 
        public string Password { get; set; }

    }
}
