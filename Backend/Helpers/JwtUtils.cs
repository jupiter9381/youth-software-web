using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Youth.Data;
using Youth.DtOs;
using System.Security.Claims;

namespace Youth.Helpers
{
    public interface IJwtUtils
    {
        public string GenerateToken(User user);
    }
    public class JwtUtils : IJwtUtils
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private readonly AppSettings _options;

        public JwtUtils(ApplicationDbContext context, ILogger<JwtUtils> logger, IOptions<AppSettings> options)
        {
            _context = context;
            _logger = logger;
            _options = options.Value;
        }

        public string GenerateToken(User user) 
        {
            _logger.LogInformation("Generating new token for user: {UserName}", user.Username);

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_options.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                    Expires = DateTime.UtcNow.AddMinutes(_options.TimeToExpire),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex) {
                _logger.LogError("Error generating token: {Message}", ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
