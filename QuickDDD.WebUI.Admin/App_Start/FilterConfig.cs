using System.Web;
using System.Web.Mvc;

namespace Quick.WebUI.Admin
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new ElmahErrorAttribute());
        }
    }
}