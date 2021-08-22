using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }

        [Column("Artist")]
        [MaxLength(255)]
        public string Artist { get; set; }

        public virtual List<Painting> Painting { get; set; }

        [JsonIgnore]
        public Gallery Gallery { get; set; }
    }
}