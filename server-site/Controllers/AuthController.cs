using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotesApi.Models;
using NotesApi.Repositories;

namespace NotesApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User user)
        {
            if(MyDB.Users.Any(u => u.Email == user.Email))
                return BadRequest("User already exist !!!");

            MyDB.Users.Add(user);
            return Ok(new {message = "User registered successfully !!!"});
        }

        [HttpPost("login")]
        public IActionResult Login([FromQuery] string email, [FromQuery] string pass)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(pass))
            {
                return BadRequest("Email and Password are required.");
            }

            var user = MyDB.Users.FirstOrDefault(u => u.Email == email && u.Pass == pass);
            if (user == null) return Unauthorized("Invalid Credentials !!!");

            string sessionId = Guid.NewGuid().ToString();
            MyDB.ActiveSession[sessionId] = user.Email;

            return Ok(new { sessionId });

        }

        [HttpPost("logout")]
        public IActionResult Logout([FromHeader] string sessionId)
        {
            if(MyDB.ActiveSession.ContainsKey(sessionId))
            {
                MyDB.ActiveSession.Remove(sessionId);
                return Ok(new { message = " Sorry to see you gooo !!!" });
            }
            return BadRequest("Invalid Session !!!");
        }
    }
}
