using Quick.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace Quick.Repositories
{
    /// <summary>
    /// 数据库初始化策略
    /// </summary>
    public class SampleDataInitializer : DropCreateDatabaseAlways<QuickDbContext>
    {
        protected override void Seed(QuickDbContext context)
        {
            //用户
            var users = new List<User>
            {
                new User { Id = new Guid(), LoginName = "admin", LoginPwd = "1", FullName="admin", Email = "terrychen@qq.com", Phone ="123456", Enabled = true, IsDeleted = false, PwdErrorCount = 0, LoginCount = 0, RegisterTime = DateTime.Now, LastLoginTime = DateTime.Now, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now }
            };
            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();

            //角色
            var roles = new List<Role>
            {
                new Role { Id = new Guid(), Name = "系统管理员", Description = "开发人员、系统配置人员使用", OrderSort = 1, Enabled = true, IsDeleted = false, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now },
                new Role { Id = new Guid(), Name = "网站管理员", Description = "网站内容管理人员", OrderSort = 2, Enabled = true, IsDeleted = false, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now }
            };
            roles.ForEach(s => context.Roles.Add(s));
            context.SaveChanges();
        }
    }
}
