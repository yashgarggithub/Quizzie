import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log('login btn clicked');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' ||this.loginData.password == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);

          if (this.login.getUserRole() == 'ADMIN') {  //admin account-> navigate to admin dashbaord

            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true); //emitting event for subscriber (navbar comp)

          } else if (this.login.getUserRole() == 'NORMAL') {  //normal account-> navigate to normal dashbaord

            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true); //emitting event for subscriber (navbar comp)

          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('User not identified!!!', '', {
          duration: 3000,
        });
      }
    );
  }
}
