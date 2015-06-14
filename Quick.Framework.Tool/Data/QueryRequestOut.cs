using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quick.Framework.Tool
{
   
    public class QueryRequestOut<T>
    {


        public  int total { get; set; }//行数

        public T[] rows { get; set; }//数据

    }
}
