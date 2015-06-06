namespace Quick.Domain.Migrations
{
    using Quick.Repositories;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<QuickDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(QuickDbContext context)
        {
            //�û�
            var users = new List<User>
            {
                new User { Id = new Guid(), LoginName = "admin", LoginPwd = "1", FullName="admin", Email = "terrychen@qq.com", Phone ="123456", Enabled = true, IsDeleted = false, PwdErrorCount = 0, LoginCount = 0, RegisterTime = DateTime.Now, LastLoginTime = DateTime.Now, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now }
            };
            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();

            //��ɫ
            var roles = new List<Role>
            {
                new Role { Id = new Guid(), Name = "ϵͳ����Ա", Description = "������Ա��ϵͳ������Աʹ��", OrderSort = 1, Enabled = true, IsDeleted = false, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now },
                new Role { Id = new Guid(), Name = "��վ����Ա", Description = "��վ���ݹ�����Ա", OrderSort = 2, Enabled = true, IsDeleted = false, CreateId = 1, CreateTime = DateTime.Now, ModifyId = 1, ModifyTime = DateTime.Now }
            };
            roles.ForEach(s => context.Roles.Add(s));
            context.SaveChanges();
        }
    }
}
