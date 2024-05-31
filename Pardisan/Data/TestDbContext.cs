using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pardisan.Models;
using Pardisan.Models.Blog;
using Pardisan.Models.News;

namespace Pardisan.Data
{
    public class TestDbContext : IdentityDbContext<ApplicationUser>
    {
        public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
        {
        }

        public DbSet<News> News { get; set; }
       


    }
}
