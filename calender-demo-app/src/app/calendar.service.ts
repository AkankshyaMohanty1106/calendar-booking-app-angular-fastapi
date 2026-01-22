import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CalendarService {

  private API = 'http://localhost:8000/api/bookings';

  constructor(private http: HttpClient) {}

  loadState() {
    return this.http.get<any>(this.API);
  }

  signup(slotId: string) {
    return this.http.post<any>(`${this.API}/signup/${slotId}`, {});
  }

  cancel(slotId: string) {
    return this.http.post<any>(`${this.API}/cancel/${slotId}`, {});
  }
}
