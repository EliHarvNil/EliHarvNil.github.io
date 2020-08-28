using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blog.Shared.Entities;

namespace Blog.Server.Database.Entities
{
    public class BlogEntry
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }

        public string Header { get; set; }
        public string Body { get; set; }
        public string HeaderImageRoute { get; set; }
        public List<string> Tags { get; set; }

        public static explicit operator Blog.Shared.Entities.BlogEntry(BlogEntry sqlBlogEntry)
        {
            return new Shared.Entities.BlogEntry()
            {
                Id = sqlBlogEntry.Id,
                CreateDate = sqlBlogEntry.CreateDate,
                Header = sqlBlogEntry.Header,
                Body = sqlBlogEntry.Body,
                HeaderImageRoute = sqlBlogEntry.HeaderImageRoute,
                Tags = sqlBlogEntry.Tags,
            };
        }

        public static explicit operator BlogEntry(Blog.Shared.Entities.BlogEntry SharedBlogEntry)
        {
            return new BlogEntry()
            {
                Id = SharedBlogEntry.Id,
                CreateDate = SharedBlogEntry.CreateDate,
                Header = SharedBlogEntry.Header,
                Body = SharedBlogEntry.Body,
                HeaderImageRoute = SharedBlogEntry.HeaderImageRoute,
                Tags = SharedBlogEntry.Tags,
            };
        }
    }
}
