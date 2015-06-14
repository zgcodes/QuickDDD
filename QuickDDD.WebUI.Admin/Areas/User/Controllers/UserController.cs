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

        public JsonResult GetList(UserQueryInput input)
        {
            var list = UserService.GetAll(input);

            var json = new
            {
                total = list.total,
                rows = list.rows
            };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit(Guid? id)
        {
            UserDto model = null;
            if (!id.HasValue)  //新建
            {
                model = new UserDto();
                ViewBag.ActionName = "Create";
            }
            else  //编辑
            {
                model = UserService.GetById(id.Value);
                ViewBag.ActionName = "Update";
            }
            return View(model);
        }

        public JsonResult Delete(Guid id)
        {
            UserService.Delete(id);
            return Json(1, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Create(UserDto model)
        {
            UserService.Create(model);
            return Json(1, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(UserDto model)
        {
            UserService.Update(model);
            return Json(1, JsonRequestBehavior.AllowGet);

        }

    }
}
