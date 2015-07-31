using System.IO;
using System.Web;
using System.Web.Mvc;

namespace IntegrationTests.Ui.Helpers
{
    public static class HtmlHelpers
    {
        public static IHtmlString RenderHtml(this HtmlHelper htmlHelper, string htmlFilePath)
        {
            var filePath = HttpContext.Current.Server.MapPath(htmlFilePath);

            // load from file
            using (var streamReader = File.OpenText(filePath))
            {
                var markup = streamReader.ReadToEnd();
                return new HtmlString(markup);
            }
        }
    }
}
