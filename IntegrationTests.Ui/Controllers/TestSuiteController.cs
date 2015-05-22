using System.Threading.Tasks;
using System.Web.Mvc;

namespace IntegrationTests.Ui.Controllers
{
    public class TestSuiteController : Controller
    {
        public async Task<ActionResult> Index()
        {
            return PartialView();
        }
    }
}