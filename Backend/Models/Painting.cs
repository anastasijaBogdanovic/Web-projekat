using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Painting")]
    public class Painting
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

        [Column("Dimensions")]
        [MaxLength(255)]
        public string Dimensions { get; set; }

        [Column("Created")]
        [MaxLength(255)]
        public string Created { get; set; }

        [Column("ImageOfPainting")]
        [DataType(DataType.ImageUrl)]  
        public string ImageOfPainting { get; set; }

        [JsonIgnore]
        public Category Category { get; set; }
    }
}