using Quick.Framework.Tool;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace System.Linq
{
    public static class IQueryableExtensions
    {
        /// <summary>
        /// 分页查询(## this IQueryable<TEntity> queryable，说明是扩展的IQueryable<TEntity>类型的方法)
        /// 泛型方法，由调用方确定的类型，都是放在方法名<这里>来声明的。如扩展方法类型，参数类型
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="queryable"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        //public static IQueryable<TEntity> Query<TEntity>(this IQueryable<TEntity> queryable, QueryRequestInput input)
        //{
        //    return queryable.OrderBy(m=>input.order).Skip(input.SkipCount).Take(input.rows);
        //}

        /// <summary>
        /// 分页并返回封装的结果
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryable"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        public static QueryRequestOut<T> ToOutPut<T>(this IQueryable<object> queryable, QueryRequestInput input)
        {

            Type tType = typeof(T);
            Type type = typeof(QueryRequestOut<>);
            type = type.MakeGenericType(tType);
            QueryRequestOut<T> result = (QueryRequestOut<T>)Activator.CreateInstance(type);

            result.total = queryable.Count();

            var newQueryable = queryable.OrderBy(m => input.order).Skip(input.SkipCount).Take(input.rows);

            IList<object> list = newQueryable.ToList();
            result.rows = list.MapToList<T>().ToArray();
            return result;
        }
    }
}