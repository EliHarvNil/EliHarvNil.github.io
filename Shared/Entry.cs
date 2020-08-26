using System;
using System.Collections.Generic;
using System.Text;

namespace Blog.Shared
{
    public class Entry
    {
        public string Header { get; set; }
        public string Body { get; set; }
        public List<string> Tags { get; set; }
    }
}
