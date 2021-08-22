using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Gallery")]
    public class Gallery
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        public virtual List<Category> Categories { get; set; }
    }
}