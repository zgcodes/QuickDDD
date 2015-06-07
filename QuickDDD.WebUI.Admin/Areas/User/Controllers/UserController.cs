using Microsoft.Practices.Unity;
using Quick.Application.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Quick.WebUI.Admin.Areas.User.Controllers
{
    public class UserController : Controller
    {
        [Dependency]
        public IUserService UserService { get; set; }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetList()
        {
            var list = UserService.GetAll();

            var json = new
            {
                total = list.Count,
                rows = list.ToArray()
            };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

    }
}
