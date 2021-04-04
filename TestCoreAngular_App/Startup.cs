using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCoreAngular_App.Models;
using TestCoreAngular_App.Repositories;

namespace TestCoreAngular_App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = "Server=(localdb)\\mssqllocaldb;Database=AngularGridtestsdb;Trusted_Connection=True;";
            services.AddDbContext<UserContext>(options => options.UseSqlServer(connection));

            services.AddTransient<IUserRepository, UserRepository>();
            
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigin", builder => {
                    //  builder.AllowAnyOrigin();
                    builder.WithOrigins("http://localhost:4200");
                    builder.WithMethods("GET", "PUT", "POST", "DELETE");
                    builder.AllowAnyHeader();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();

            app.UseRouting();
            
            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                  endpoints.MapControllers();
            });
        }
    }
}
