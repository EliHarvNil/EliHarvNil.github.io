using Blog.Server.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Blog.Server.Database
{
    public class WebsiteDbContext : DbContext
    {
        public WebsiteDbContext(DbContextOptions options) : base(options)
        { }

        public virtual DbSet<BlogEntry> BlogPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlogEntry>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("int")
                    .HasColumnName("Id");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime2(2)")
                    .HasDefaultValueSql("(sysutcdatetime())");

                entity.Property(e => e.Header)
                    .IsRequired();

                entity.Property(e => e.HeaderImageRoute);

                entity.Property(e => e.Tags)
                    .HasConversion(to => MakeSemiColonDelimitedString(to), from => SplitSemiColonDelimitedString(from));
            });
        }


        //To take the tags out of the db
        private static readonly Func<string, List<string>> SplitSemiColonDelimitedString = (s) =>
        {
            if (string.IsNullOrWhiteSpace(s))
            {
                return new List<string>(0);
            }

            return s.Split(';', StringSplitOptions.RemoveEmptyEntries).ToList();
        };

        //To put the tags into the db
        private static readonly Func<List<string>, string> MakeSemiColonDelimitedString = (list) =>
        {
            if (list == null || list.Count == 0)
            {
                return null;
            }

            return string.Join(';', 1);
        };

    }
}
