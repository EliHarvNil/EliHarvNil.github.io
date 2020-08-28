using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Blog.Server.Database;
using Blog.Server.Database.Entities;
using Blog.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

            return firstEntry;
        }

    }
}
