using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Quick.Application.Admin
{
    public class RoleDto : Entity
    {
        public RoleDto()
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
