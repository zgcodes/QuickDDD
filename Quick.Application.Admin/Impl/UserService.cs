using Quick.Domain;
using Quick.Framework.Tool;
using Quick.Repositories;
using System;
using System.ComponentModel.Composition;
using System.Linq;



namespace Quick.Application.Admin
{
	/// <summary>
    /// 服务层实现类 —— UserService
    /// </summary>
    [Export(typeof(IUserService))]
    public class UserService : ServiceBase,IUserService 
    {
        [Import]
        public IUserRepository UserRepository {get;set;}
      
		
        
        #region 公共方法

        //public OperationResult Insert(UserDto model);

        //OperationResult Update(UserDto model);

        ///// <summary>
        ///// 逻辑删除
        ///// </summary>
        ///// <param name="Id"></param>
        ///// <returns></returns>
        //OperationResult Delete(object id);

        #endregion

         //<summary>
         //用户登录
         //</summary>
         //<param name="loginInfo">登录信息</param>
         //<returns>业务操作结果</returns>
        public OperationResult Login(UserDto model)
        {
            
            User user = UserRepository.Get(m=>m.LoginName == model.LoginName).FirstOrDefault();
            if (user == null)
            {
                return new OperationResult(OperationResultType.QueryNull, "指定账号的用户不存在。");
            }
            if (user.LoginPwd != model.LoginPwd)
            {
                return new OperationResult(OperationResultType.Warning, "登录密码不正确。");
            }
            return new OperationResult(OperationResultType.Success, "登录成功。", user);
        }
	}
}
