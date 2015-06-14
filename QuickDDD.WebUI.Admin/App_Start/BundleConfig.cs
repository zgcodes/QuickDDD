﻿using System.Web;
using System.Web.Optimization;

namespace Quick.WebUI.Admin
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                        "~/Scripts/common.js"));

            bundles.Add(new ScriptBundle("~/bundles/home").Include(
                       "~/Scripts/home.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                  "~/Scripts/bootstrap.js",
                   "~/Scripts/bootstrap-modalmanager.min.js",
                        "~/Scripts/bootstrap-modal.min.js",
                        "~/Scripts/bootbox.min.js",
                        "~/Scripts/extensions/bootstrap-datetimepicker.min.js",
                        "~/Scripts/extensions/bootstrap-datetimepicker.zh-CN.js",
                        "~/Scripts/extensions/jquery.blockUI.js",
                         "~/Scripts/extensions/toastr.min.js",
                        "~/Scripts/extensions/abp.js",
                        "~/Scripts/extensions/jquery.Jcrop.min.js",
                        "~/Scripts/extensions/site.js"));

            //easyui
            bundles.Add(new StyleBundle("~/Content/themes/blue/css").Include("~/Content/themes/blue/easyui.css"));
            bundles.Add(new StyleBundle("~/Content/themes/gray/css").Include("~/Content/themes/gray/easyui.css"));
            bundles.Add(new StyleBundle("~/Content/themes/metro/css").Include("~/Content/themes/metro/easyui.css"));




            // 使用 Modernizr 的开发版本进行开发和了解信息。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/site.css",
   
                      "~//Content/bootstrap/css/bootstrap-modal-bs3patch.css",
                      "~/Content/bootstrap/css/bootstrap-modal.css",
                      
                      "~/Content/bootstrap-datetimepicker.min.css",
                        "~/Content/toastr.min.css",
                         "~/Content/bootstrap-theme.min.css",
                           "~/Content/AbpSite.css"));
        }
    }
}