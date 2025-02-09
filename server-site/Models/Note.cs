using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NotesApi.Models
{
    public class Note
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? NoteId { get; set; }

        [ForeignKey("UserId")]
        public string? UserId { get; set; }
        public string Type { get; set; }
        
        [MaxLength(100)]
        public string? Content { get; set; }
        public string? ReminderDate{ get; set; }
        public string? DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
        public string? BookmarkUrl { get; set; }
    }
}
