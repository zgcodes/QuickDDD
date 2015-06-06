
using System;
using System.Linq;
using System.ComponentModel.Composition;
using Quick.Domain;
using System.Collections.Generic;


namespace Quick.Repositories
{
	/// <summary>
    /// 仓储操作层实现 —— User
    /// </summary>
    [Export(typeof(IUserRepository))]
    public class UserRepository : EfRepositoryBase<User>,IUserRepository
    {

        public UserRepository()
            : base(new QuickDbContext())
        { }
    
    }
}
