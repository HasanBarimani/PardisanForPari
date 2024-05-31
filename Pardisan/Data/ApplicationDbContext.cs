using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pardisan.Models;
using Pardisan.Models.Blog;
using Pardisan.Models.News;

namespace Pardisan.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<News> News { get; set; }
        public DbSet<NewsCategory> NewsCategories { get; set; }

        public DbSet<Blog> Blog { get; set; }
        public DbSet<BlogCategory> BlogCategories { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Estate> Estates { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyFeatures> PropertyFeatures { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<FeatureOption> FeatureOptions { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<NeighborhoodOfGrowingUpRecommendation> NeighborhoodOfGrowingUpRecommendations { get; set; }
        public DbSet<PropertyOwner> PropertyOwners { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<EstateImage> EstateImages { get; set; }
        public DbSet<SurveyOwner> SurveyOwners { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<CustomerForSale> CustomerForSales { get; set; }
        public DbSet<CustomerForBuy> CustomerForBuys { get; set; }
        public DbSet<CustomerForm> CustomerForms { get; set; }
        public DbSet<PropertyOwnersList> PropertyOwnersList { get; set; }
        public DbSet<Holding> Holdings { get; set; }
        public DbSet<HoldingImage> HoldingImages { get; set; }
        public DbSet<Aparat> Aparats { get; set; }
        public DbSet<SiteVisit> SiteVisit{ get; set; }
        public DbSet<EstateUnits> EstateUnits{ get; set; }
        public DbSet<Floors> Floors{ get; set; }

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    base.OnModelCreating(builder);
        //}


    }
}
