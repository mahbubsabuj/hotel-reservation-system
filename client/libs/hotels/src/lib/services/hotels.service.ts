import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  constructor(private httpClient: HttpClient) {}
  getHotel(id: string): Observable<Hotel> {
    return this.httpClient.get<Hotel>(`${environment.apiURL}/hotels/${id}`);
  }
  getHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(`${environment.apiURL}/hotels`);
  }
  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.httpClient.post<Hotel>(`${environment.apiURL}/hotels`, hotel);
  }
  updateHotel(id: string, hotel: Hotel): Observable<Hotel> {
    return this.httpClient.put<Hotel>(
      `${environment.apiURL}/hotels/${id}`,
      hotel
    );
  }
  deleteHotel(id: string): Observable<unknown> {
    return this.httpClient.delete(`${environment.apiURL}/hotels/${id}`);
  }
}
