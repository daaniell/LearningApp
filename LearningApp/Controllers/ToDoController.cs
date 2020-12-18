using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningApp.Data.Data;
using LearningApp.Data.Models;

namespace TodoApiReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        AppDbContext db;
        public TodosController(AppDbContext context)
        {
            db = context;
        }

        [HttpGet]
        public List<Item> Get()
        {
            return db.Items.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Post(Item todo)
        {
            db.Items.Add(todo);
            await db.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpPut]
        public async Task<ActionResult<Item>> Put(Item todo)
        {
            if (todo == null)
            {
                return BadRequest();
            }
            if (!db.Items.Any(x => x.Id == todo.Id))
            {
                return NotFound();
            }

            db.Update(todo);
            await db.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> Delete(int id)
        {
            Item todo = db.Items.FirstOrDefault(x => x.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            db.Items.Remove(todo);
            await db.SaveChangesAsync();
            return Ok(todo);
        }
    }
}
