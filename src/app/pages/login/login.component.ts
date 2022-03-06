import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private snack: MatSnackBar, private login:LoginService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

public loginData={
  username:'',
  password:''
}

  formSubmit(){


    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }//if password null

    this.login.generateToken(this.loginData).subscribe(

      (data:any)=>{
        console.log("Success",data)

        //save token in localstorage
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user)=>{
          this.login.setUser(user)
          console.log(user)

          if (this.login.getUserRole() == 'ADMIN') {
            //admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            //normal user dashbaord
            window.location.href = '/user-dashboard';
            // this.router.navigate(['user-dashboard/0']);
            // this.router.navigate(['user-dashboard']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        })
      },
      (error)=>{
        console.log("error at login comp",error)

        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );//generate token


  }//formsubmit
}
