using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Quick.Repositories
{
    public class EfRepositoryBase<TEntity> : IRepository<TEntity>
        where TEntity :Entity
    {
        internal QuickDbContext context;
        internal DbSet<TEntity> dbSet;

        public EfRepositoryBase(QuickDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();//如果DbSet不用泛型，定义了DbSet entity，那就是：context.entity

        }

        public virtual IQueryable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            //重点理解
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query);
            }
            else
            {
                return query;
            }
        }

        public virtual TEntity GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public virtual void Insert(TEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreateTime = DateTime.Now;
            dbSet.Add(entity);
            context.SaveChanges();//TODO:提交数据库。注意，如果多次“数据操作（insert，undate,delete）”后再提交这一个公用的context，就可以作为事务了，
            //所以，在这里保存不合适,
            //需要用工作单元来保存
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
            context.SaveChanges();//保存
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
            context.SaveChanges();//保存
        }
    }
}