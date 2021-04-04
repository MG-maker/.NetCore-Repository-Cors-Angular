using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCoreAngular_App.Models;

namespace TestCoreAngular_App.Repositories
{
   public interface IUserRepository: IDisposable
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task Add(User user);
        void Update(User user);
        void Delete(User user);
        Task Save();
    }
}
