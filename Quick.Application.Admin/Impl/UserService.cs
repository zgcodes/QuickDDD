using Quick.Domain;
using Quick.Framework.Tool;
using Quick.Repositories;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Practices.Unity;
using System;



namespace Quick.Application.Admin
{
	/// <summary>
    /// 服务层实现类 —— UserService
    /// </summary>
    public class UserService : ServiceBase,IUserService 
    {
        [Dependency]
        public IUserRepository UserRepository {get;set;}

       // public IUnitOfWork UnitOfWork { get; set; }
		
        
        #region 公共方法

        public void Create(UserDto model)
        {
            model.Enabled = false;
            model.PwdErrorCount = 0;
            model.LoginCount = 0;
            model.RegisterTime = DateTime.Now;
            UserRepository.Insert(model.MapTo<User>());
        }

        public void Update(UserDto model)
        {
            var entity = UserRepository.GetByID(model.Id);
            UserRepository.Update(model.MapTo(entity));
        }

        public UserDto GetById(Guid id) {
            var entity = UserRepository.GetByID(id);
            return entity.MapTo<UserDto>();
        }

        #endregion

        public QueryRequestOut<UserDto> GetAll(UserQueryInput input)
        {
            return UserRepository.Get().ToOutPut<UserDto>(input);
        }


        public void Delete(Guid id)
        {
            UserRepository.Delete(id);
        }

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
