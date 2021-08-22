using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GalleryController : ControllerBase
    {
        public GalleryContext Context { get; set; }
        public GalleryController(GalleryContext context)
        {
            Context = context;
        }

    [Route("GetGallery")]
    [HttpGet]
    public async Task<List<Gallery>> GetGallery()
    {
        return await Context.Galleries.Include(p => p.Categories).ThenInclude(a => a.Painting).ToListAsync();
    }

    [Route("CreateGallery")]
    [HttpPost]
    public async Task CreateGallery([FromBody] Gallery g)
    {
        Context.Galleries.Add(g);
        await Context.SaveChangesAsync();
    }

    [Route("UpdateGallery")]
    [HttpPut]
    public async Task UpdateGallery([FromBody] Gallery g)
    {
        Context.Update<Gallery>(g);
        await Context.SaveChangesAsync();
    }

    [Route("DeleteGallery")]
    [HttpDelete]
    public async Task DeleteGallery(int id)
    {
        var g = await Context.Galleries.FindAsync(id);
        Context.Remove(g);
        await Context.SaveChangesAsync();
    }

    [Route("CreatePainting/{categoryId}")]
    [HttpPost]
    public async Task<IActionResult> CreatePainting(int categoryId, [FromBody] Painting p)
    {
        var category = await Context.Categories.FindAsync(categoryId);
        p.Category = category;

        if (p.Name == "" || p.Artist == "" || p.Dimensions == "" || p.Created == "" || p.ImageOfPainting == "" || p.Category == null)
        {
            return StatusCode(406);
        }
        else
        {
            Context.Paintings.Add(p);
            await Context.SaveChangesAsync();
            int x = p.ID;
            return Ok(x);
        }
    }

    [Route("UpdatePainting")]
    [HttpPut]
    public async Task<IActionResult> UpdatePainting([FromBody] Painting p)
    {
        if (p.Name == "" || p.Artist == "" || p.Dimensions == "" || p.Created == "" || p.ImageOfPainting == "")
        {
            return StatusCode(406);
        }
        else
        {
            Context.Update<Painting>(p);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }

    [Route("DeletePainting")]
    [HttpDelete]
    public async Task DeletePainting(int id)
    {
        var p = await Context.Paintings.FindAsync(id);
        Context.Remove(p);
        await Context.SaveChangesAsync();
    }

    [Route("CreateCategory/{galleryId}")]
    [HttpPost]
    public async Task CreateCategory(int galleryId, [FromBody] Category category)
    {
        var g = await Context.Galleries.FindAsync(galleryId);
        category.Gallery = g;
        Context.Categories.Add(category);
        await Context.SaveChangesAsync();
    }

    [Route("GetCategory")]
    [HttpGet]
    public async Task<List<Category>> GetCategory()
    {
        return await Context.Categories.Include(p => p.Painting).ToListAsync();
    }

    [Route("DeleteCategory")]
    [HttpDelete]
    public async Task DeleteCategory(int id)
    {
        var c = await Context.Categories.FindAsync(id);
        Context.Remove(c);
        await Context.SaveChangesAsync();
    }
    
    [Route("UpdateCategory")]
    [HttpPut]
    public async Task UpdateCategory([FromBody] Category c)
    {
        Context.Update<Category>(c);
        await Context.SaveChangesAsync();
    }

    }
}
