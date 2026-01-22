import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PreferencesService } from '../preferences.service';
import { AppStateService } from '../app-state.service';
import { AppState } from '../app-state';

@Component({
  standalone: true,
  selector: 'app-preferences',
  imports: [CommonModule, FormsModule],
  templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit {

  categories = ['Cat 1', 'Cat 2', 'Cat 3'];

  selected: Record<string, boolean> = {};

  errorMessage = '';

  constructor(
    private router: Router,
    private prefService: PreferencesService,
    private appStateService: AppStateService
  ) {}

  ngOnInit() {
    // this.categories.forEach(c => this.selected[c] = false);

    // this.appStateService.loadState().subscribe(state => {
    //   this.appStateService.hydrate(state);

    //   AppState.preferences.categories.forEach(cat => {
    //     this.selected[cat] = true;
    //   });
    // });
    // Initialize ALL checkboxes as UNSELECTED
    this.categories.forEach(c => {
      this.selected[c] = false;
    });

    // Load backend state ONLY (no auto-check)
    this.appStateService.loadState().subscribe(state => {
      this.appStateService.hydrate(state);
    });
  }

  savePreferences() {
    const selectedCategories = this.categories.filter(c => this.selected[c]);

    console.log('Saving categories:', selectedCategories);

    if (selectedCategories.length === 0) {
      this.errorMessage = 'Please select at least one category';
      return;
    }

    this.prefService.save(selectedCategories).subscribe({
      next: (state) => {
        console.log('API response:', state);

        this.appStateService.hydrate(state);
        this.errorMessage = '';

        alert('Preferences saved!');
        this.router.navigate(['/calendar']);
      },
      error: (err) => {
        console.error('API error:', err);
        this.errorMessage = 'Failed to save preferences';
      }
    });
  }
}
