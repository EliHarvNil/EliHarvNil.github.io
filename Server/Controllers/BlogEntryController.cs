using Blog.Server.Database;
using Blog.Shared.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogEntryController : ControllerBase
    {
        private readonly WebsiteDbContext _websiteDbContext;
        private readonly ILogger<BlogEntryController> _logger;

        public BlogEntryController(WebsiteDbContext websiteDbContext, ILogger<BlogEntryController> logger)
        {
            _websiteDbContext = websiteDbContext;
            _logger = logger;
        }

        [HttpGet]
        public BlogEntry Get()
        {
            var firstEntry = _websiteDbContext.BlogPosts.First();

            return (Blog.Shared.Entities.BlogEntry)firstEntry;
        }

        [HttpGet]
        [Route("{id}")]
        public BlogEntry Get(int id)
        {
            var entry = _websiteDbContext.BlogPosts.Where(bp => bp.Id == id).FirstOrDefault();

            if(entry == default)
            {
                return null;
            }

            return (BlogEntry)entry;
        }

        [HttpGet]
        [Route("Teases/{countOfTeases}")]
        public List<BlogEntryTease> GetBlogEntryTeases(int countOfTeases)
        {
            var blogEntries = _websiteDbContext.BlogPosts.OrderByDescending(bp => bp.CreateDate).Take<Database.Entities.BlogEntry>(countOfTeases).ToList();

            var blogEntryTeases = new List<BlogEntryTease>(countOfTeases);
            foreach(var entry in blogEntries)
            {
                blogEntryTeases.Add( new BlogEntryTease((BlogEntry)entry));
            }

            return blogEntryTeases;
        }

    }
}
