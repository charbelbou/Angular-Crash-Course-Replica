import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  // Toggling button, inverts the value.
  // Updates subject
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  // Returns subject as observable to subscribe to.
  onToggle(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
