using System.Web.Mvc;

namespace Quick.WebUI.Admin.Areas.Common
{
    public class CommonAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Common";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Common_default",
                "Common/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional },
                new string[] { "Quick.WebUI.Admin.Areas.Common.Controllers" }
            );
        }
    }
}
