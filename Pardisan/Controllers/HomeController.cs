using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pardisan.Data;
using Pardisan.Interfaces;
using Pardisan.Models;
using Pardisan.Services;
using Pardisan.ViewModels;
using Pardisan.ViewModels.DynamicContent;
using Pardisan.ViewModels.Estate;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Pardisan.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHelperService _helperService;
        private readonly ILogger<HomeController> _logger;
        private readonly IBlogRepository _blogRepository;
        private readonly IEstateRepository _estateRepository;
        private readonly IAparatRepository _aparatRepository;
        private readonly IPageRepository _pageRepository;
        private readonly IHoldingRepository _holdingRepository;
        private readonly ApplicationDbContext _context;


        public HomeController(ILogger<HomeController> logger, IBlogRepository blogRepository,
            IEstateRepository estateRepository, ApplicationDbContext context,
            IPageRepository pageRepository,
            IHoldingRepository holdingRepository,
            IAparatRepository aparatRepository, IHelperService helperService)
        {
            _logger = logger;
            _blogRepository = blogRepository;
            _estateRepository = estateRepository;
            _context = context;
            _pageRepository = pageRepository;
            _holdingRepository = holdingRepository;
            _aparatRepository = aparatRepository;
            _helperService = helperService;
        }

        public async Task<IActionResult> Index()
        {

            var settings = _context.Settings.Where(x => x.IsActive.Value).AsNoTracking();
            var pros = _context.Estates.Where(x => x.IsActive == true).AsNoTracking();
            
            var set = new ContentsVM
            {
                Aparat = settings.FirstOrDefault(x => x.Key == "Aparat")?.Value,
                Aparat2 = settings.FirstOrDefault(x => x.Key == "Aparat2")?.Value,
                Aparat3 = settings.FirstOrDefault(x => x.Key == "Aparat3")?.Value,
                Cellphone = settings.FirstOrDefault(x => x.Key == "Cellphone").Value,
                UnderSliderText = settings.FirstOrDefault(x => x.Key == "UnderSliderText").Value,
                CounselingTitle = settings.FirstOrDefault(x => x.Key == "CounselingTitle").Value,
                CounselingContent = settings.FirstOrDefault(x => x.Key == "CounselingContent").Value,
                StaticContent = settings.FirstOrDefault(x => x.Key == "StaticContent").Value,
                SaieldUnits = settings.FirstOrDefault(x => x.Key == "SaiedUnits").Value,
                ImageDocs = settings.FirstOrDefault(x => x.Key == "ImageDocs").Value,
                titleForVideos = settings.FirstOrDefault(x => x.Key == "titleForVideos").Value,
                titleForProject = settings.FirstOrDefault(x => x.Key == "titleForProject").Value,
                titleForBlogs = settings.FirstOrDefault(x => x.Key == "titleForHolding").Value,
                DonePro = pros.Where(x => x.Status == 0).Count(),
                CurrentPro=pros.Where(x => x.Status > 0).Count()

            };
            var blogs = await _blogRepository.GetAllBlog();

            string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";

            var estates = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
            //var estates = await _estateRepository.GetAllForView();
            var holding = await _holdingRepository.GetAll();
            var aparat = await _aparatRepository.GetAll();
            var sliders = _context.Sliders.Where(x => x.IsActive.Value).AsNoTracking();

            var vm = new HomeVM
            {
                Blogs = blogs.Data,
                Estates = estates.data.OrderByDescending(w=> w.Code).Take(16).ToList(),
                Holding = holding.Data,
                Aparat = aparat.Data.Take(3).ToList(),
                Content = set,
                Slider = sliders.ToList()


            };
            return View(vm);
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        public IActionResult Achievement()
        {
            return View();
        }

        public IActionResult Certificate()
        {
            return View();
        }

        public IActionResult ContactUS()
        {
            return View();
        }


        public IActionResult OurTeam()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }
        [Route("page/{pageName}")]
        [HttpGet]
        public async Task<IActionResult> Page(string pageName)
        {
            var data = await _pageRepository.GetPage(pageName);

            if (data == null)
                return NotFound();

            return View(data);
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public async Task<IActionResult> Message(HomeVM input)
        {
            if (ModelState.IsValid)
            {
                var massages = new Models.Message()
                {

                    Content = input.messageVM.Content,
                    Name = input.messageVM.Name,
                    Email = input.messageVM.Email,


                };
                _context.Messages.Add(massages);
                _context.SaveChanges();
                var blogs = await _blogRepository.GetAllBlog();
                //var estates = await _estateRepository.GetAll();

                string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";

                var estates = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
                var vm = new HomeVM
                {
                    Blogs = blogs.Data,
                    Estates = estates.data.Take(16).ToList()
                };
                return new JsonResult(vm);
            }
            else return NotFound();

        }
        public IActionResult data()
        {
            var d = _context.Messages;
            return new JsonResult(d);
        }
    }
}
