using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quick.Application.Admin
{
    public class UserDto : Entity
    {
        public UserDto()
        {
			this.UserRole = new List<UserRole>();
        }

        public string LoginName { get; set; }
        public string LoginPwd { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Enabled { get; set; }
        public int PwdErrorCount { get; set; }
        public int LoginCount { get; set; }
        public DateTime? RegisterTime { get; set; }
        public DateTime? LastLoginTime { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
