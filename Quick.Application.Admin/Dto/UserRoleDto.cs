using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quick.Application.Admin
{
    public class UserRoleDto : Entity
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
