import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.formInit();
  }
  formInit() {
    this.loginForm = this.formBuilder.group({
      username: [
        'testing',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      password: ['Test@Test', Validators.compose([Validators.required])],
    });
  }

  getErrorMessage(controlName: string, alias: string) {
    const control = this.loginForm.controls[controlName];

    if (control.errors) {
      if (control.errors['required']) {
        return alias + ' is required';
      }
      if (control.errors['minlength']) {
        return (
          alias +
          ' should have at least ' +
          control.errors['minlength'].requiredLength +
          ' characters'
        );
      }
      if (control.errors['pattern']) {
        return 'Invalid ' + alias.toLowerCase();
      }
      if (control.errors['maxlength']) {
        return (
          alias +
          ' should not have more than ' +
          control.errors['maxlength'].requiredLength +
          ' characters'
        );
      }
      if (control.errors['min']) {
        return alias + ' should be greater than ' + control.errors['min'].min;
      }
      if (control.errors['max']) {
        return alias + ' can not be greater than ' + control.errors['max'].max;
      }
    }
    return;
  }

  login() {
    // localStorage.setItem('token', 'qwertyuioasdfghjkxcvbnmsdfghjk123456789');
    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.login(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response['user'] == true) {
          this._snackBar.open('Logged in successfully..','',{
            duration : 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });
          localStorage.setItem('token', response['token'])
          this.router.navigate(['party-list']);
        } 
      },
      error: (err) => {
        console.log('error', err);
        if(err.error['User'] == false) {
          this._snackBar.open('Please provide valid user details', '',{
            duration : 2000,
            horizontalPosition : 'right',
            verticalPosition : 'top'
          });
        }
      },
      complete: () => {},
    });
  }
}
