using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IntegrationTests.Ui.Startup))]
namespace IntegrationTests.Ui
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
