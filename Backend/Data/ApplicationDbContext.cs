using Microsoft.EntityFrameworkCore;
using Youth.DtOs;

namespace Youth.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
