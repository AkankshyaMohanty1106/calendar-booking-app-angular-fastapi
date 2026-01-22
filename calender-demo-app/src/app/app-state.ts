export interface Slot {
  id: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  bookedBy: string | null;
}

export class AppState {
  static currentUser = 'me@example.com';

  static preferences = {
    categories: [] as string[]
  };

  static events: Slot[] = [];
}
