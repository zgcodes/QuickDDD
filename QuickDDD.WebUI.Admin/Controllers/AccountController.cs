using Microsoft.Practices.Unity;
using Quick.Application.Admin;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Quick.WebUI.Admin.Controllers
{

    public class AccountController : Controller
    {
         [Dependency]
        private IUserService UserService { get; set; }
        //public AccountController(IUserService userService)
        //{ 

        //    _userService = userService;
        //}


        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string LoginName, string LoginPwd)
        {
            var model = new UserDto() { LoginName = LoginName, LoginPwd = LoginPwd };
            model.LastLoginTime = DateTime.Now;
            var result = UserService.Login(model);
            Session["CurrentUser"] = model;
            Session.Timeout = 20;
            return Json(result);
        }


    }
}
