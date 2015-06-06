using System.Web;
using System.Web.Mvc;

namespace QuickDDD.WebUI.Member
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}