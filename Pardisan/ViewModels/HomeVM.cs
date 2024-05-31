using Pardisan.Models;
using Pardisan.ViewModels.Aparat;
using Pardisan.ViewModels.Blog;
using Pardisan.ViewModels.DynamicContent;
using Pardisan.ViewModels.Estate;
using Pardisan.ViewModels.Holding;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Pardisan.ViewModels
{
    public class HomeVM
    {
        public BlogIndexViewModel Blogs { get; set; }
        public List<EstateFroShow> Estates { get; set; }
        public List<HoldingVM> Holding { get; set; }
        public List<AparatVM> Aparat { get; set; }
        public HomeMessageVM messageVM { get; set; }
        public ContentsVM Content { get; set; }
        public List<Slider> Slider { get; set; }
    }
    public class HomeMessageVM
    {
        [Display(Name = "نام")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public string Name { get; set; }
        [Display(Name = "ایمیل")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public string Email { get; set; }
        [Display(Name = "محتوا")]
        [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
        public string Content { get; set; }

    }
}
