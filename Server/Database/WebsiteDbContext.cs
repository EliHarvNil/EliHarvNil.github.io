using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Blog.Server.Database.Entities;
using System.Runtime;

namespace Blog.Server.Database
{
    public class WebsiteDbContext : DbContext
    {
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

        public WebsiteDbContext()
        {
        }

        public virtual DbSet<BlogEntry> BlogPosts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("SHOULDTHROWEXCEPTION");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlogEntry>(entity =>
            {
                //entity.Property(e => e.Id)
                //    .HasColumnType("int")
                //    .HasColumnName("Id");

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

    }
}
