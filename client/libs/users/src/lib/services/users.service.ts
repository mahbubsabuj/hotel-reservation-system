import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users/`);
  }
  updateUser(user: User, id: string): Observable<unknown>{
    return this.httpClient.put(`${environment.apiURL}/users/${id}`, user);
  }
  deleteUser(id: string): Observable<unknown>{
    return this.httpClient.delete(`${environment.apiURL}/users/${id}`);
  }
}
