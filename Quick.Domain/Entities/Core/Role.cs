using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Quick.Domain
{
    public class Role : Entity
    {
        public Role()
        {
			this.UserRole = new List<UserRole>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int OrderSort { get; set; }
        public bool Enabled { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
