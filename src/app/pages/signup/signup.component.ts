import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService, private snack:MatSnackBar) { }


  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user)

    if(this.user.username =='' || this.user.username == null)
    {
      // alert("username is required");
      this.snack.open("Username is required","",{duration:1,horizontalPosition:'right',verticalPosition:'top'});
      // Swal.fire('Successfully done !!', 'empty', 'success');
      return
    }
    //validate

    this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      console.log(data)
      Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
    },//data
    (error)=>{
      console.log(error);
      this.snack.open("Something went wrong","",{duration:300,horizontalPosition:'right',verticalPosition:'top'})
    }//errror
    )//subscribe


  }



}
