namespace Quick.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Role",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        OrderSort = c.Int(nullable: false),
                        Enabled = c.Boolean(nullable: false),
                        IsDeleted = c.Boolean(),
                        CreateId = c.Int(),
                        CreateTime = c.DateTime(),
                        ModifyId = c.Int(),
                        ModifyTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserRole",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(),
                        CreateId = c.Int(),
                        CreateTime = c.DateTime(),
                        ModifyId = c.Int(),
                        ModifyTime = c.DateTime(),
                        Role_Id = c.Guid(),
                        User_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Role", t => t.Role_Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.Role_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        LoginName = c.String(),
                        LoginPwd = c.String(),
                        FullName = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        Enabled = c.Boolean(nullable: false),
                        PwdErrorCount = c.Int(nullable: false),
                        LoginCount = c.Int(nullable: false),
                        RegisterTime = c.DateTime(),
                        LastLoginTime = c.DateTime(),
                        IsDeleted = c.Boolean(),
                        CreateId = c.Int(),
                        CreateTime = c.DateTime(),
                        ModifyId = c.Int(),
                        ModifyTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRole", "User_Id", "dbo.User");
            DropForeignKey("dbo.UserRole", "Role_Id", "dbo.Role");
            DropIndex("dbo.UserRole", new[] { "User_Id" });
            DropIndex("dbo.UserRole", new[] { "Role_Id" });
            DropTable("dbo.User");
            DropTable("dbo.UserRole");
            DropTable("dbo.Role");
        }
    }
}
