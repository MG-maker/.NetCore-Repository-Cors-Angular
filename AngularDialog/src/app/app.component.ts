import {Component, OnInit,AfterViewInit,ViewChild} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';

import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({ 
    selector: 'my-app', 
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService],
    
}) 
export class AppComponent implements OnInit,AfterViewInit {
    
    public changeUser: User;// полученный пользователь
    dia:boolean=false;
    userInput: User=new User(); // данные вводимого пользователя
    
    displayedColumns: string[] = ['id', 'name', 'age','action'];
   
    MatdataSource = new MatTableDataSource<User>();
    dataSource : any;
    constructor(private service:UserService, public dialog:MatDialog){}
        
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator;

    // пагинация и сортировка
    ngAfterViewInit(): void {
        this.MatdataSource.sort = this.sort;
        this.MatdataSource.paginator=this.paginator;
      }
    ngOnInit() {
       this.loadUsers();
      
      } 
     
      // открытие диалога создание пользователя
      openDialog(action,obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300px',
          data:obj
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result.event == 'Add'){
            this.userAdd(result.data);
           }else if(result.event == 'Update'){
             this.userUpdate(result.data);
          }else if(result.event == 'Delete'){
            this.userDelete(result.data);
           }
        });
      }
    
         //загрузка пользователей
     private loadUsers() {
          this.service.getUsers().subscribe(result=>{
          this.dataSource=result;
          this.MatdataSource.data=this.dataSource;
        });
    }
    
     userAdd(userInput:User) {
      this.service.createUser(userInput)
      .subscribe((data:User)=>{
        this.changeUser=data;
        this.dia=true;
          this.dataSource.push(this.changeUser);
         this.MatdataSource = new MatTableDataSource( this.dataSource);
      });
    }

     userUpdate (newRow) {
       this.dataSource = this.dataSource.filter((value)=>{
              if(value.id == newRow.id){
                value.name = newRow.name;
                value.age = newRow.age;
              }
                return true;
            });
            this.changeUser = {   
              id:newRow.id,    
              name:newRow.name,
              age:parseInt(newRow.age)
           };
            this.service.updateUser(this.changeUser).subscribe(data => {
            });
          }

    userDelete (newRow) {
      this.dataSource= this.dataSource.filter((value)=>{
       
        return value.id!=newRow.id;
      });
      this.MatdataSource=this.dataSource;
      this.service.deleteUser(newRow.id).subscribe(data=>{})
    }

    // фильтрация данных
        public doFilter = (value:string)=>{
        this.MatdataSource.filter=value.trim().toLocaleUpperCase();
    }
}