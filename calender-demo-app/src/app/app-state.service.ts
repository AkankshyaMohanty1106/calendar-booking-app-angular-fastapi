import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from './app-state';

@Injectable({ providedIn: 'root' })
export class AppStateService {

  private API = 'http://localhost:8000/api/preferences';

  constructor(private http: HttpClient) {}

  loadState() {
    return this.http.get<any>(this.API);
  }

  hydrate(state: any) {
    AppState.currentUser = state.currentUser;
    AppState.preferences = state.preferences;
    AppState.events = state.events;
  }
}
