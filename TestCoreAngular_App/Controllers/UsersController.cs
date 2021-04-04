using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCoreAngular_App.Models;
using TestCoreAngular_App.Repositories;

namespace TestCoreAngular_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAllOrigin")]
public class UsersController : Controller
{
    private readonly IUserRepository repo;

    public UsersController(IUserRepository repository)
    {
        repo = repository;
    }

    [HttpGet]
    public async Task<IEnumerable<User>> GetUsers()
    {
        return await repo.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await repo.GetById(id);
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Add(User user)
    {
        await repo.Add(user);
        await repo.Save();
        return Ok(user);
    }

    [HttpPut]
    public async Task<IActionResult> Update(User user)
    {
        if (ModelState.IsValid)
        {
            repo.Update(user);
            await repo.Save();
            return Ok(user);
        }
        return BadRequest(ModelState);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await repo.GetById(id);
        repo.Delete(user);
        await repo.Save();
        return Ok();
    }
}
}
