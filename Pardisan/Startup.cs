using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Pardisan.Config.Extentions;
using Pardisan.Data;
using Pardisan.Extensions;
using Pardisan.Interface;
using Pardisan.Interfaces;
using Pardisan.Middleware;
using Pardisan.Models;
using Pardisan.Services;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Web.DependencyInjection;
using System;
using System.IO.Compression;
using System.Linq;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace Pardisan
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddImageSharp();
            services.AddScoped<INewsRepository, NewsRepository>();
            services.AddScoped<IBlogRepository, BlogRepository>();
            services.AddScoped<IPageRepository, PagesRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IJwtManager, JwtManager>();
            services.AddScoped<ISurveyRepository, SurveyRepository>();
            services.AddScoped<IQuestionRepository, QuestionRepository>();
            services.AddScoped<IEstateRepository, EstateRepository>();
            services.AddScoped<IOwnerRepository, OwnerRepository>();
            services.AddScoped<IFeatureRepository, FeatureRepository>();
            services.AddScoped<IFeatureOptionRepository, FeatureOptionRepository>();
            services.AddScoped<IPropertyRepository, PropertyRepository>();
            services.AddScoped<IUnitRepository, UnitRepository>();
            services.AddScoped<INeighborhoodOfGrowingUpRecommendationRepository, NeighborhoodOfGrowingUpRecommendationRepository>();
            services.AddScoped<IPropertyOwnerRepository, PropertyOwnerRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<IUploaderService, UploaderService>();
            services.AddScoped<ICustomerForSaleRepository, CustomerForSaleRepository>();
            services.AddScoped<ICustomerForBuyRepository, CustomerForBuyRepository>();
            services.AddScoped<ICustomerFormRepository, CustomerFormRepository>();
            services.AddScoped<IHoldingRepository, HoldingRepository>();
            services.AddScoped<IAparatRepository, AparatRepository>();
            services.AddScoped<IGlobalDynomicContent, GlobalDynomicContentRepository>();
            services.AddScoped<IHelperService, HelperService>();
            services.AddHttpClient();
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddSingleton<HtmlEncoder>(
                 HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin,
                                                           UnicodeRanges.All}));
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes =
                    ResponseCompressionDefaults.MimeTypes.Concat(
                        new[] { "image/svg+xml" });
            });
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(10);
            });
            services
               .AddMvc(option =>
               {
                   option.EnableEndpointRouting = false;
               }).AddRazorOptions(options =>
               {
                   options.ViewLocationFormats.Add("/{0}.cshtml");
               })
               .AddRazorRuntimeCompilation();


            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddRoleManager<RoleManager<IdentityRole>>()
            .AddDefaultTokenProviders()
            .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(
                               "http://localhost:3000",
                               "http://localhost:3011",
                               "https://localhost:3011",
                               "http://localhost:5173",
                               "https://localhost:5173",
                               "https://crm.pardisangroup.com",
                               "http://crm.pardisangroup.com",
                               "https://survey.pardisangroup.com",
                               "http://survey.pardisangroup.com",
                               "https://crm.pardisan-mc.com",
                               "http://crm.pardisan-mc.com",
                               "https://survey.pardisan-mc.com",
                               "http://survey.pardisan-mc.com"
                               ).AllowAnyHeader()
                               .AllowAnyMethod()
                               .AllowCredentials();
                });

            });
            services.AddOurAuthentication(PublicHelper.SecretKey);
            services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(1);
                options.LoginPath = "/Account/Login";
                options.SlidingExpiration = true;
            });

            services.AddSwaggerDoc();
            services.AddHttpClient();
            services.AddSwaggerGenNewtonsoftSupport();
            services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(type => type.ToString());
            });


            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddControllersWithViews().AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });



            services.AddRazorPages();
            services
                .AddMvc(option =>
                {
                    option.EnableEndpointRouting = false;
                }).AddRazorOptions(options =>
                {
                    options.ViewLocationFormats.Add("/{0}.cshtml");
                })
                .AddRazorRuntimeCompilation();

            services.AddHttpClient();

            services.AddControllers();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseImageSharp();
            app.UseDeveloperExceptionPage();
            app.UseMigrationsEndPoint();
            app.UseStatusCodePagesWithReExecute("/Error/{0}");
            app.UseHttpsRedirection();
            app.UseResponseCompression();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = context =>
                context.Context.Response.Headers.Add("Cache-Control", "public, max-age=2592000")
            });
            app.UseCookiePolicy();

            app.UseAuthentication();

            app.UseSession();

            app.UseStatusCodePagesWithReExecute("/Error/page", "?code={0}");

            app.Use(async (context, next) =>
            {
                string path = context.Request.Path;

                if (path.EndsWith(".css") || path.EndsWith(".js") || path.EndsWith(".jpg") || path.EndsWith(".jpeg") || path.EndsWith(".png"))
                {
                    //Set css and js files to be cached for 7 days
                    TimeSpan maxAge = new TimeSpan(7, 0, 0, 0);     //7 days
                    context.Response.Headers.Append("Cache-Control", "max-age=" + maxAge.TotalSeconds.ToString("0"));
                }
                else
                {
                    //Request for views fall here.
                    context.Response.Headers.Append("Cache-Control", "no-cache");
                    context.Response.Headers.Append("Cache-Control", "private, no-store");
                }
                await next();
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();


            app.UseMiddleware<SiteVisitCounter>();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseSwagger();
            app.UseCors("CorsPolicy");

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = "docs";
                c.DocumentTitle = "Pardisan Api Documentation";
            });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                  name: "areas",
                  template: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );
            });

        }
    }
}
