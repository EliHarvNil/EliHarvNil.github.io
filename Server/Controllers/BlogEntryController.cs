using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Blog.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Blog.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogEntryController : ControllerBase
    {
        private Entry entry = new Entry {
            Header = "Test Entry",
            Body = "Meow Meow"
        };
        private readonly ILogger<BlogEntryController> logger;

        public BlogEntryController(ILogger<BlogEntryController> logger)
        {
            this.logger = logger;
        }

        [HttpGet]
        public Entry Get()
        {
            entry.Tags = new List<string>();
            entry.Tags.Add("one");

            return entry;
        }

    }
}
