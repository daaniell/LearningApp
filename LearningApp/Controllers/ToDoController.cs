﻿using Microsoft.AspNetCore.Mvc;
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
    [Route("/api/todos")]
    public class TodosController : ControllerBase
    {
        AppDbContext db;
        public TodosController(AppDbContext context)
        {
            db = context;
            if (!db.Items.Any())
            {
                db.Items.Add(new Item { Name = "Finish app", IsCompleted = false, UntilDate = DateTime.Parse("26.12.2020") });
                db.Items.Add(new Item { Name = "Go home after work", IsCompleted = false, UntilDate = DateTime.Parse("31.12.2020") });
                db.SaveChanges();
            };
        }
        [HttpGet]
        public List<Item> Get()
        {
            return db.Items.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Post([FromBody]Item todo)
        {
            try
            {
                todo.Id = 0;
                db.Items.Add(todo);
                await db.SaveChangesAsync();
                return Ok(todo);
            }
            catch(Exception ex)
            {
            Console.WriteLine(ex.Message);
            return Ok(todo);
        }
        }

        [HttpPut("{id}/PutComplete")]
        public async Task<ActionResult<Item>> PutComplete(int id)
        {
            Item todo = db.Items.FirstOrDefault(x => x.Id == id);
            if (todo == null)
            {
                return BadRequest();
            }
            if (!db.Items.Any(x => x.Id == todo.Id))
            {
                return NotFound();
            }

            if (!todo.IsCompleted)
            {
                todo.IsCompleted = true;
            }
            else
            {
                todo.IsCompleted = false;
            }

            db.Update(todo);
            await db.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpPut("{id}/PutImportant")]
        public async Task<ActionResult<Item>> PutImportant(int id)
        {
            Item todo = db.Items.FirstOrDefault(x => x.Id == id);
            if (todo == null)
            {
                return BadRequest();
            }
            if (!db.Items.Any(x => x.Id == id))
            {
                return NotFound();
            }

            if (!todo.IsImportant)
            {
                todo.IsImportant = true;
            }
            else
            {
                todo.IsImportant = false;
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
