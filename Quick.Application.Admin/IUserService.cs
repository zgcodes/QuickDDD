using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Linq;



namespace Quick.Application.Admin
{
	/// <summary>
    /// 服务层接口 —— IUserService
    /// </summary>
    public interface IUserService
    {
        #region 公共方法

        OperationResult Login(UserDto model);

        #endregion
	}
}
