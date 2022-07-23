import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '@client/users';
import { LocalStorageService } from '@client/utils';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private ngxService: NgxUiLoaderService
  ) {}
  login(): void {
    this.ngxService.start();
    const user: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.logIn(user).subscribe({
      next: (user: User) => {
        this.ngxService.stop();
        this.localStorageService.setToken(user.token || '');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.ngxService.stop();
        console.log('ERROR', error);
      }
    });
  }
}
