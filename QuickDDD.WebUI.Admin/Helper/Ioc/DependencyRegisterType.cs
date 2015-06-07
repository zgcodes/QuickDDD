using Microsoft.Practices.Unity;
using Quick.Application.Admin;
using Quick.Domain;
using Quick.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Quick.WebUI.Admin
{
    /// <summary>
    /// 
    /// </summary>
    public class DependencyRegisterType
    {
        //系统注入
        public IUnityContainer GetUnityContainer()
        {
            //Create UnityContainer          
            IUnityContainer container = new UnityContainer()
            .RegisterType<IUserService, UserService>().
            RegisterType<IUserRepository,UserRepository>();
            return container;
        }
    }
}