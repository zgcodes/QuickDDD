
using Quick.Domain;
using System.ComponentModel.Composition;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace Quick.Repositories
{
    /// <summary>
    ///     QuickDDD项目数据访问上下文
    /// </summary>
    public class QuickDbContext : DbContext
    {
        #region 构造函数

        /// <summary>
        ///     初始化一个 使用连接名称为“default”的数据访问上下文类 的新实例
        /// </summary>
        public QuickDbContext()
            : base("default") { }

        /// <summary>
        /// 初始化一个 使用指定数据连接名称或连接串 的数据访问上下文类 的新实例
        /// </summary>
        public QuickDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString) {  }

        #endregion

        #region 属性  (针对每个聚合根都会定义一个DbSet的属性)

        public DbSet<Role> Roles { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    //移除一对多的级联删除约定，想要级联删除可以在 EntityTypeConfiguration<TEntity>的实现类中进行控制
        //    modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        //    //多对多启用级联删除约定，不想级联删除可以在删除前判断关联的数据进行拦截
        //    //modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
        //}
    }
}