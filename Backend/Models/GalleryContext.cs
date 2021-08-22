using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{

    public class GalleryContext : DbContext
    {
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<Painting> Paintings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public GalleryContext(DbContextOptions options) : base(options)
        {

        }
    }
}