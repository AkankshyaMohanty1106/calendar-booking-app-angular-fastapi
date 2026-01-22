import { Routes } from '@angular/router';
import { PreferencesComponent } from './preferences/preferences.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'preferences', pathMatch: 'full' },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'admin', component: AdminComponent }
];
