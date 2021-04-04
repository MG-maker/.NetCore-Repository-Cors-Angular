import { Component, Inject,Optional } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import {User} from '../user';
import{FormControl,Validators} from '@angular/forms/'
  
@Component({ 
  selector: 'app-dialog', 
  templateUrl: 'dialog.component.html', 
}) 
export class DialogComponent { 
  
  action:string;
  local_data:any;

  constructor( 
    public dialogRef: MatDialogRef<DialogComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) { 
      console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
    } 

    myForm = new FormControl('', [
      Validators.required
    ]);
 
    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
    submit() {
      console.log(this.myForm);
      }

    getErrorMessage() {
      return this.myForm.hasError('required') ? 'Required field Name.Name must contain from 3 to 15 characters!' :
          '';
    }
    getErrorMessage2() {
      return this.myForm.hasError('required') ? 'Required field Age.Age must contain no more than 2 digits!' :
          '';
    }

    closeDialog(){
      this.dialogRef.close({event:'Cancel'});
    }
    
}