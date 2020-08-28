using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Shared.Entities
{
    public class BlogEntryTease
    {
        public BlogEntryTease()
        {

        }

        public BlogEntryTease(BlogEntry blogEntry)
        {
            Id = blogEntry.Id;
            CreateDate = blogEntry.CreateDate;
            Header = blogEntry.Header;
            HeaderImageRoute = blogEntry.HeaderImageRoute;
        }

        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        
        public string Header { get; set; }
        public string HeaderImageRoute { get; set; }
    }
}
