import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '@client/users';
import { LocalStorageService } from '@client/utils';

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
    private localStorageService: LocalStorageService
  ) {}
  login(): void {
    const user: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.logIn(user).subscribe({
      next: (user: User) => {
        this.localStorageService.setToken(user.token || '');
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.log('ERROR', error);
      }
    });
  }
}
