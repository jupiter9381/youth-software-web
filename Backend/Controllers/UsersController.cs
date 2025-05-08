using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Youth.Data;
using Youth.Models.RequestModels;
using Youth.Services;

namespace Youth.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;
        public UsersController(ApplicationDbContext context, IUserService userService) {
            _context = context;
            _userService = userService;
        }

        #region Authentication methods
        [AllowAnonymous]
        [HttpPost("authenticate")]

        public IActionResult Authenticate(AuthRequest model)
        {
            try
            {
                var response = _userService.Authenticate(model);
                if (response != null) { 
                    return Ok(response);
                }
                else
                    return BadRequest("Server Error");
            }
            catch (Exception ex)
            {
                return BadRequest(new Exception($"Error authenticating user: {ex.Message}", ex.InnerException));
            }
        }

        [AllowAnonymous]
        [HttpPost("sign-up")]
        public IActionResult SignUp(AuthSignUpRequest model)
        {
            try
            {
                var response = _userService.SignUp(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new Exception($"Error authenticating user: {ex.Message}", ex.InnerException));
            }
        }
        #endregion
    }
}