using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AnimalsListAPI.Models;
using System.Web.Http.Cors;

namespace AnimalsListAPI.Controllers
{
	[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
	public class AnimalsController : ApiController
    {
        private AnimalsDBEntities1 db = new AnimalsDBEntities1();

        // GET: api/Animals
        public IQueryable<Animal> GetAnimals()
        {
            return db.Animals;
        }

        // GET: api/Animals/5
        [ResponseType(typeof(Animal))]
        public IHttpActionResult GetAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }

        // PUT: api/Animals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAnimal(int id, Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != animal.AnimalId)
            {
                return BadRequest();
            }

            // Do not add duplicate record
            int aniCount = db.Animals.Where(a => a.Name == animal.Name).Count();
            if (aniCount > 0)
                throw new HttpResponseException(HttpStatusCode.Conflict);

            db.Entry(animal).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Animals
        [ResponseType(typeof(Animal))]
        public IHttpActionResult PostAnimal(Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

		// Do not add duplicate record
		Animal ani = db.Animals.Where(a => a.Name == animal.Name).FirstOrDefault<Animal>();
		if(ani != null)
			throw new HttpResponseException(HttpStatusCode.Conflict);

            db.Animals.Add(animal);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = animal.AnimalId }, animal);
        }

        // DELETE: api/Animals/5
        [ResponseType(typeof(Animal))]
        public IHttpActionResult DeleteAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            db.Animals.Remove(animal);
            db.SaveChanges();

            return Ok(animal);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AnimalExists(int id)
        {
            return db.Animals.Count(e => e.AnimalId == id) > 0;
        }
    }
}