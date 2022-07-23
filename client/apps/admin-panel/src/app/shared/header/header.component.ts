import { Component } from '@angular/core';
import { AuthService } from '@client/users';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logOut(): void {
    this.authService.logOut();
  }
}
