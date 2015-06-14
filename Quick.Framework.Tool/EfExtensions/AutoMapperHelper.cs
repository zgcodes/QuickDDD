using AutoMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Quick.Framework.Tool
{
    /// <summary>
    /// AutoMapper扩展帮助类
    /// </summary>
    public static class AutoMapperHelper
    {
        /// <summary>
        ///  类型映射,返回目标类型
        /// </summary>
        public static T MapTo<T>(this object obj)
        {
            if (obj == null) return default(T);
            Mapper.CreateMap(obj.GetType(), typeof(T));
            return Mapper.Map<T>(obj);
        }

        /// <summary>
        /// 集合列表类型映射
        /// </summary>
        public static List<TDestination> MapToList<TDestination>(this IEnumerable source)
        {
            foreach (var first in source)
            {
                var type = first.GetType();
                Mapper.CreateMap(type, typeof(TDestination));
                break;
            }
            return Mapper.Map<List<TDestination>>(source);
        }
        /// <summary>
        /// 集合列表类型映射
        /// </summary>
        public static List<TDestination> MapToList<TSource, TDestination>(this IEnumerable<TSource> source)
        {
            //IEnumerable<T> 类型需要创建元素的映射
            Mapper.CreateMap<TSource, TDestination>();
            return Mapper.Map<List<TDestination>>(source);
        }
        /// <summary>
        /// 类型映射，拷贝数据到目标对象(修改时用到)（TODO:如果原对象属性值为null，而目标属性有值，则目标值会被覆盖，这样不允许。
        /// 解决办法：##限制CreateTime等属性不拷贝，这就需要把Entity类放到基础设施层了）
        /// </summary>
        public static TDestination MapTo<TSource, TDestination>(this TSource source, TDestination destination)
            where TSource : Entity
            where TDestination : Entity
        {
            if (source == null) return destination;
            Mapper.CreateMap<TSource, TDestination>()
                .ForMember(dest =>dest.CreateTime, opt => opt.Ignore());
            return Mapper.Map(source, destination);
        }
        /// <summary>
        /// DataReader映射
        /// </summary>
        public static IEnumerable<T> DataReaderMapTo<T>(this IDataReader reader)
        {
            Mapper.Reset();
            Mapper.CreateMap<IDataReader, IEnumerable<T>>();
            return Mapper.Map<IDataReader, IEnumerable<T>>(reader);
        }
    }
}