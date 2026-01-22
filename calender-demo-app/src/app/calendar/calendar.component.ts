import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppState, Slot } from '../app-state';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  categories: string[] = [];
  selectedCategory!: string;

  currentUser = AppState.currentUser;
  events: Slot[] = AppState.events;

  weekStart!: Date;
  weekDates: { date: string; label: string }[] = [];
  weekLabel = '';

  times: string[] = [];

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit() {
    // ✅ Load backend state
    this.calendarService.loadState().subscribe(state => {
      AppState.currentUser = state.currentUser;
      AppState.preferences = state.preferences;
      AppState.events = state.events;

      this.currentUser = AppState.currentUser;
      this.events = AppState.events;

      this.categories = AppState.preferences.categories || [];
      this.selectedCategory = this.categories[0];

      this.generateTimes();
      this.setCurrentWeek();
    });
  }

  setCurrentWeek() {
    const today = new Date();
    const day = today.getDay() === 0 ? 7 : today.getDay();

    this.weekStart = new Date(today);
    this.weekStart.setDate(today.getDate() - day + 1);
    this.weekStart.setHours(0, 0, 0, 0);

    this.buildWeek();
  }

  buildWeek() {
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(this.weekStart);
      d.setDate(this.weekStart.getDate() + i);

      this.weekDates.push({
        date: this.formatDate(d),
        label: this.formatDayLabel(d)
      });
    }

    this.weekLabel =
      `${this.weekDates[0].label} – ${this.weekDates[6].label}`;
  }

  prevWeek() {
    this.weekStart.setDate(this.weekStart.getDate() - 7);
    this.buildWeek();
  }

  nextWeek() {
    this.weekStart.setDate(this.weekStart.getDate() + 7);
    this.buildWeek();
  }

  generateTimes() {
    this.times = [];
    for (let h = 0; h < 24; h++) {
      this.times.push(h.toString().padStart(2, '0') + ':00');
    }
  }

  getSlot(date: string, time: string): Slot | undefined {
    return this.events.find(
      e =>
        e.category === this.selectedCategory &&
        e.date === date &&
        e.startTime === time
    );
  }

  // signup(slot: Slot) {
  //   if (!slot.bookedBy) {
  //     slot.bookedBy = this.currentUser;
  //   }
  // }

  // cancel(slot: Slot) {
  //   if (slot.bookedBy === this.currentUser) {
  //     slot.bookedBy = null;
  //   }
  // }

  // ✅ BOOK SLOT VIA BACKEND
  signup(slot: Slot) {
    this.calendarService.signup(slot.id).subscribe(state => {
      this.events = state.events;
    });
  }

  // ✅ CANCEL VIA BACKEND
  cancel(slot: Slot) {
    this.calendarService.cancel(slot.id).subscribe(state => {
      this.events = state.events;
    });
  }

  slotClass(slot: Slot) {
    if (!slot.bookedBy) return 'available';
    if (slot.bookedBy === this.currentUser) return 'my-booking';
    return 'other-booking';
  }

  goAdmin() {
    this.router.navigate(['/admin']);
  }

  formatDate(d: Date): string {
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  formatDayLabel(d: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[d.getDay()]} ${d.getDate()}`;
  }
}
