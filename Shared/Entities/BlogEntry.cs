using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Shared.Entities
{
    public class BlogEntry
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }

        public string Header { get; set; }
        public string Body { get; set; }
        public string HeaderImageRoute { get; set; }
        public List<string> Tags { get; set; }
    }
}
