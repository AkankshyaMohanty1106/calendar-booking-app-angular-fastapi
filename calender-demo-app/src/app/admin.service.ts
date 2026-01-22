import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private API = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  addSlot(slot: any) {
    return this.http.post<any>(`${this.API}/slots`, slot);
  }

  cancelSlot(id: string) {
    return this.http.post<any>(`${this.API}/cancel/${id}`, {});
  }
}
