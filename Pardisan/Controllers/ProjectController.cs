using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Pardisan.Interfaces;
using Pardisan.ViewModels.Estate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Threading.Tasks;

namespace Pardisan.Controllers
{
    public class ProjectController : Controller
    {
        private readonly IEstateRepository _estateRepository;
        private readonly IHelperService _helperService;

        public ProjectController(IEstateRepository estateRepository, IHelperService helperService)
        {
            _estateRepository = estateRepository;
            _helperService = helperService;
        }

        public async Task<IActionResult> Index()
        {
            string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";
            var dataFromDb = await _estateRepository.GetAllForView();

            var data = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
            var datainlocalDb=_estateRepository.GetAllForView();
            return View(datainlocalDb);
        }

        public async Task<IActionResult> Details(int id)
        {

            string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";
            
            var data = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
            var resual = data.data.Where(x => x.Id == id).FirstOrDefault();
            var tm = DateTime.Parse(resual.ProjectCompletionDate.ToString());
            resual.ProjectCompletionDateForShow = tm.ToString("yyyy/M/d");


            var tmStart = DateTime.Parse(resual.StartDate.ToString());
            resual.StartDateForShow = tmStart.ToString("yyyy/M/d");

            return View(resual);
        }
        public async Task<IActionResult> GetById(int? id)
        {
            string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";

            var data = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
            var resual = data.data.Where(x => x.Id == id).FirstOrDefault();
            resual.ProjectCompletionDateForShow = resual.ProjectCompletionDate.ToShortPersianDateString();
            resual.StartDateForShow = resual.StartDate.ToShortPersianDateString();
            return Json(resual);
        }

        public async Task<IActionResult> CallApi()
        {
            // Define the API endpoint URL
            string url = "https://api.pardisan-mc.com/api/estateforwebapp/getall";

            var data = await _helperService.CallApi<List<EstateFroShow>>(url, "GET");
            return Json(data);
        }
        public async Task<IActionResult> OldPros(int id)
        {

            var model = await _estateRepository.GetById(id);
            return View(model.Data);
        }

    }
}
