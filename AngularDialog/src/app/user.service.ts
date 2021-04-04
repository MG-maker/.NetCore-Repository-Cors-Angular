import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
    
@Injectable()
export class UserService{
    
    private url = "https://localhost:44387/api/users";
    constructor(private http: HttpClient){ }
       
    getUsers(){
        return this.http.get(this.url);
    }
    getUser(id: number) {
        return this.http.get(this.url + '/' + id);
    }
   
    createUser(user: User){
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.url, JSON.stringify(user), {headers: myHeaders}); 
    }
    updateUser(user: User) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(user), {headers:myHeaders});
    }
    deleteUser(id: number){
        return this.http.delete(this.url + '/' + id);
    }
}