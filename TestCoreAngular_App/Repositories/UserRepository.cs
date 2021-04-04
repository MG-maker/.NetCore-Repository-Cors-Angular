using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCoreAngular_App.Models;
using Microsoft.EntityFrameworkCore;


namespace TestCoreAngular_App.Repositories
{
    public class UserRepository :  IUserRepository
    {
        protected UserContext db;
        public UserRepository(UserContext context)
        {
            db = context;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await db.Users.ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await db.Users.FindAsync(id);
        }

        public async Task Add(User user)
        {
            await db.Users.AddAsync(user);
        }

        public async Task Save()
        {
           await db.SaveChangesAsync();
        }

        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
        }

        public void Delete(User user)
        {
          db.Users.Remove(user);
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
           disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
