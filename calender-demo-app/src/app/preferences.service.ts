import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PreferencesService {

  private API = 'http://localhost:8000/api/preferences';

  constructor(private http: HttpClient) {}

  save(categories: string[]) {
    return this.http.post<any>(this.API, { categories });
  }
}
