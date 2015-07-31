using System.Configuration;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using System.Web.Mvc;
using MongoDB.Driver.Builders;

namespace IntegrationTests.Ui.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            return PartialView();
        }

        public async Task<ContentResult> LatestTestResult()
        {
            var mongoconnection = ConfigurationManager.AppSettings["mongo"];
            var database = ConfigurationManager.AppSettings["mongodb"];
            var mongoClient = new MongoClient(mongoconnection);
            var server = mongoClient.GetServer();

            server.Connect();

            var db = server.GetDatabase(database);
            var collection = db.GetCollection("testresults");

            var query = new SortByBuilder();
            query.Descending("Timestamp");

            var latestDocument = collection.FindAllAs<BsonDocument>().SetSortOrder(query).SetLimit(1);
            server.Disconnect();

            var jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
            var json = latestDocument.ToJson(jsonWriterSettings);

            return Content(json, "application/json");
        }
    }
}