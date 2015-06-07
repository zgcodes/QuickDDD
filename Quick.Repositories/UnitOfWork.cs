using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;

namespace Quick.Repositories
{
    [Export(typeof(IUnitOfWork))]
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private QuickDbContext context = new QuickDbContext();
        private EfRepositoryBase<Entity> repository;

        public EfRepositoryBase<Entity> Repository
        {
            get
            {

                if (this.repository == null)
                {
                    this.repository = new EfRepositoryBase<Entity>(context);
                }
                return repository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}