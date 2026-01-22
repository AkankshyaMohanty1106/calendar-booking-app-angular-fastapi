import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppState, Slot } from '../app-state';
import { AdminService } from '../admin.service';
import { AppStateService } from '../app-state.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  categories = ['Cat 1', 'Cat 2', 'Cat 3'];
  category = 'Cat 1';

  selectedDate: Date | null = null;
  startTime = '';
  endTime = '';

  times = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0') + ':00'
  );

  // events = AppState.events;
  events: Slot[] = [];
  constructor(
    private router: Router,
    private adminService: AdminService,
    private appStateService: AppStateService
  ) { }
  ngOnInit() {
    // 🔑 LOAD STATE ON PAGE LOAD
    this.appStateService.loadState().subscribe(state => {
      this.appStateService.hydrate(state);
      this.events = AppState.events;
    });
  }

  formatDate(d: Date): string {
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }
  // ✅ THIS WAS MISSING
  disablePastDates = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };
  addSlot() {
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      alert('Fill all fields');
      return;
    }
    const slot = {
      id: 'slot-' + Date.now(),
      category: this.category,
      date: this.formatDate(this.selectedDate),
      startTime: this.startTime,
      endTime: this.endTime
    };
    this.adminService.addSlot(slot).subscribe(state => {
      console.log(state);
      this.appStateService.hydrate(state.appState);
      this.events = AppState.events;
      alert('Slot added');
    });
    // this.events.push({
    //   id: 'slot-' + Date.now(),
    //   category: this.category,
    //   date: this.formatDate(this.selectedDate),
    //   startTime: this.startTime,
    //   endTime: this.endTime,
    //   bookedBy: null
    // });

    // alert('Slot added');
    // this.startTime = '';
    // this.endTime = '';
  }

  // adminCancel(slot: Slot) {
  //   const ok = confirm(`Cancel booking for ${slot.bookedBy}?`);
  //   if (ok) slot.bookedBy = null;
  // }
  adminCancel(slot: Slot) {
    if (!confirm('Cancel booking?')) return;

    this.adminService.cancelSlot(slot.id).subscribe(state => {
      this.appStateService.hydrate(state);
      this.events = AppState.events;
    });
  }
  // disablePastDates = (date: Date | null): boolean => {
  //   if (!date) return false;
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   return date >= today;
  // };

  back() {
    this.router.navigate(['/calendar']);
  }
}
