using Abp.Application.Navigation;
using Abp.Localization;
using Fami.Core;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Fami.Mc.Web
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses Fami's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See Views/Layout/_TopMenu.cshtml file to know how to render menu.
    /// </summary>
    public class NavigationProvider
    {
        public void SetNavigation()
        {
            //string savePath = "~/App_Data/Navigation.json";
            //string path = System.Web.HttpContext.Current.Server.MapPath(savePath);
            //var menu = System.IO.File.ReadAllText(path);
            //context.Manager.MainMenu.Items = JsonConvert.DeserializeObject<IList<MenuItemDefinition>>(menu);

            //var menu = JsonConvert.SerializeObject(context.Manager.MainMenu.Items);
            //System.IO.File.WriteAllText(path, menu);

        }


    }
}
