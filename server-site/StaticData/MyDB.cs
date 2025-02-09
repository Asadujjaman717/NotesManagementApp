using NotesApi.Models;

namespace NotesApi.Repositories
{
    public static class MyDB
    {
        public static List<User> Users = new();
        public static List<Note> Notes = new();
        public static Dictionary<string, string> ActiveSession = new();
    }
}
