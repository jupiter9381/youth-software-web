namespace Youth.DtOs
{
    public class User
    {
        public int Id { get; set; } // Primary key
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsSuperAdmin { get; set; }
    }
}
