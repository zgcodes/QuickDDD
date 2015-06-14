using Quick.Domain;
using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Quick.Application.Admin
{
    public class UserQueryInput : QueryRequestInput
    {
        public string LoginName { get; set; }
    }
}
