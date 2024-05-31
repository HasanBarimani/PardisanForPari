using Pardisan.Data;
using Pardisan.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Pardisan
{
    public class Seed
    {
        public static async Task SeedData(UserManager<ApplicationUser> _userManager, RoleManager<IdentityRole> _roleManager,ApplicationDbContext Context)
        {
            await _roleManager.CreateAsync(new IdentityRole("Admin"));

            var adminUserName = "Afshin";
            var adminUser = new ApplicationUser
            {
                AccessFailedCount = 0,
                Email = "afshinbabaei123@gmail.com",
                EmailConfirmed = true,
                FirstName = "afshin",
                LastName = "babaei",
                NormalizedUserName = "afshin".Normalize(),
                UserName = "Afshin",
            };

            await _userManager.CreateAsync(adminUser, "21600afi");
            adminUser = await _userManager.FindByNameAsync(adminUserName);
            await _userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}
