using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NotesApi.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? DOB { get; set; }
        public string? Pass { get; set; }
    }
}
