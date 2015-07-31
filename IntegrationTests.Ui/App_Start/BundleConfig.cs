using System.Web.Optimization;
using Links;

namespace Links
{
    public static class Bundles
    {
        public static class Scripts
        {
            public static readonly string Angular = "~/js/angular";
            public static readonly string App = "~/app";
            public static readonly string Bootstrap = "~/js/bootstrap";
            public static readonly string JQuery = "~/js/jquery";
            public static readonly string Modernizr = "~/js/modernizr";
            public static readonly string Nav = "~/js/nav";
            public static readonly string Polyfill = "~/js/polyfill";
            public static readonly string Shims = "~/js/es5";
            public static readonly string Underscore = "~/underscore";
            public static readonly string Utilities = "~/js/utilities";
        }
    }
}

namespace Integration_UI
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterJavascriptBundles(bundles);
        }

        private static void RegisterJavascriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle(Bundles.Scripts.Angular)
                .Include("~/Scripts/libs/angular/angular.js",
                         "~/Scripts/libs/angular/angular-animate.js",
                         "~/Scripts/libs/angular-ui-router/angular-ui-router.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.App)
               .Include("~/Scripts/app/app.js")
               .IncludeDirectory("~/Scripts/app", "*.js", true)

               .Include("~/Scripts/libs/hallmark-ngCommon/_module.js")
               .IncludeDirectory("~/Scripts/libs/hallmark-ngCommon", "*.js", true)

               .Include("~/Scripts/libs/hallmark-ngContent/content.js")
               .IncludeDirectory("~/Scripts/libs/hallmark-ngContent", "*.js", true)

               .Include("~/Scripts/libs/hallmark-angular-ui-bootstrap/ui-bootstrap.js")
               .IncludeDirectory("~/Scripts/libs/hallmark-angular-ui-bootstrap", "*.js", true)

               .Include("~/Scripts/libs/hallmark-cookieStorage/cookieStorage.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Bootstrap)
                .Include("~/Scripts/libs/bootstrap/bootstrap.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.JQuery)
                .Include("~/Scripts/libs/jquery/jquery-{version}.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Modernizr)
                .Include("~/Scripts/libs/hallmark-modernizr/modernizr.min.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Nav)
                .Include("~/Scripts/libs/hallmark-nav/navBehindCanvas.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Polyfill)
                .Include("~/Scripts/libs/hallmark-polyfill/polyfill.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Shims)
                .Include("~/Scripts/libs/es5-shim/es5-shim.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Underscore)
                .Include("~/Scripts/libs/underscore/underscore.js")
            );

            bundles.Add(new ScriptBundle(Bundles.Scripts.Utilities)
                .Include("~/Scripts/libs/hallmark-utilities/utilities.js")
            );
        }
    }
}