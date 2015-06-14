using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quick.Domain
{
    public class User : Entity
    {

        public virtual string LoginName { get; set; }
        public virtual string LoginPwd { get; set; }
        public virtual string FullName { get; set; }
        public virtual string Email { get; set; }
        public virtual string Phone { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual int PwdErrorCount { get; set; }
        public virtual int LoginCount { get; set; }
        public virtual DateTime? RegisterTime { get; set; }
        public virtual DateTime? LastLoginTime { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
