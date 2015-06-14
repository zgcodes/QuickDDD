using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quick.Framework.Tool
{
    /// <summary>
    /// 查询参数基类（查询、分页、排序）
    /// </summary>
    public class QueryRequestInput
    {

        private string keywords;//搜索关键词

        private int? skipCount;//跳过几行

        public int rows { get; set; }//每页行数

        public int page { get; set; }//当前页是第几页

        public string order { get; set; }//排序方式（升，降）

        public string sort { get; set; }//排序列

        public virtual DateTime? StartTime{ get; set; }

        public virtual DateTime? EndTime{ get; set; }

        public virtual int SkipCount
        {
            get
            {
                if (!this.skipCount.HasValue)
                {
                    this.skipCount = new int?((this.page - 1) * this.rows);//跳过几行，第二页： (2-1)*10=10
                }
                return this.skipCount.Value;
            }
            set
            {
                this.skipCount = new int?(value);
            }
        }

    }
}
