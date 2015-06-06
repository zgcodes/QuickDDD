using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quick.Domain
{
    public class Entity
    {

        #region 构造函数

        /// <summary>
        ///     数据实体基类
        /// </summary>
        protected Entity()
        {
            IsDeleted = false;
        }

        #endregion

        #region 属性

        public Guid Id { get; set; }

        /// <summary>
        ///获取或设置是否禁用，逻辑上的删除，非物理删除
        /// </summary>
        public bool? IsDeleted { get; set; }

        /// <summary>
        /// 创建者Id
        /// </summary>
        public int? CreateId { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 修改者Id
        /// </summary>
        public int? ModifyId { get; set; }

        /// <summary>
        /// 修改者日期
        /// </summary>
        public DateTime? ModifyTime { get; set; }

        #endregion
    }
}
