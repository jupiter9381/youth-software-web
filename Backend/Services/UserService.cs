using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Youth.Data;
using Youth.DtOs;
using Youth.Helpers;
using Youth.Models.RequestModels;
using Youth.Models.ResponseModels;

namespace Youth.Services
{
    public interface IUserService
    {
        User SignUp(AuthSignUpRequest request);
        AuthResponse Authenticate(AuthRequest request);
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<UserService> _logger;
        private readonly IJwtUtils _jwtUtils;
        public UserService(
            ApplicationDbContext dbContext, ILogger<UserService> logger, IJwtUtils jwtUtils) 
        {
            _dbContext = dbContext;
            _logger = logger;
            _jwtUtils = jwtUtils;
        }

        #region Authentication methods
        public AuthResponse Authenticate(AuthRequest model)
        {
            _logger.LogInformation("Authenticating user: {UserName}", model.UserName);
            try
            {
                if (!_dbContext.Database.CanConnect()) throw new Exception("Database not available");
                else _logger.LogInformation($"Using connection string: {_dbContext.Database.GetConnectionString()}");
                
                var user = _dbContext.Users.SingleOrDefault(u => u.Username == model.UserName);

                if (user == null) throw new Exception($"User validation for user: {model.UserName} failed:");
                
                if(!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                {
                    if (user == null) throw new Exception($"User validation for user: {model.UserName} failed:");
                }

                var jwtToken = _jwtUtils.GenerateToken(user);

                AuthResponse ret = new(user, jwtToken);
                return ret;
            }
            catch (Exception ex) {
                throw new ApplicationException($"Error while authenticating user {model.UserName}: {ex.Message}");
            }
        }
        public User SignUp(AuthSignUpRequest request)
        {
            try
            {
                var user = new User()
                {
                    Id = 0,
                    Username = request.UserName,
                    Email = request.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    IsAdmin = true
                };
                _dbContext.Update(user);
                _dbContext.SaveChanges();
                return user;
            }
            catch (Exception ex) {
                return null;
            }
        }
        #endregion
    }
}
