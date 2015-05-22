using System.Web.Optimization;
using System.Web.Routing;
using Integration_UI;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IntegrationTests.Ui.Startup))]
namespace IntegrationTests.Ui
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
