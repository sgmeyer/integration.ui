using System.Configuration;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using System.Web.Mvc;
using MongoDB.Driver.Builders;

namespace IntegrationTests.Ui.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ContentResult LatestTestResult()
        {
            var mongoconnection = ConfigurationManager.AppSettings["mongo"];
            var database = ConfigurationManager.AppSettings["mongodb"];
            var mongoClient = new MongoClient(mongoconnection);
            var server = mongoClient.GetServer();

            server.Connect();

            var db = server.GetDatabase(database);
            var collection = db.GetCollection("testresults");

            var query = new SortByBuilder();
            query.Descending("_id");

            var latestDocument = collection.FindAllAs<BsonDocument>().SetSortOrder(query).SetLimit(1);
            server.Disconnect();

            var jsonWriterSettings = new JsonWriterSettings { OutputMode = JsonOutputMode.Strict };
            var json = latestDocument.ToJson(jsonWriterSettings);

            return Content(json, "application/json");
        }
    }
}