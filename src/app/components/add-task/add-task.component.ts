import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  // Event emitter passed in from parent component.
  // Once it gets emitted, triggers AddTask(event) function in Tasks component.
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  // Boolean which determines whether form is visible or not.
  showAddTask: boolean = false;
  subscription: Subscription;

  // Booleans concerning validation errors.
  error1: boolean = false;
  error2: boolean = false;

  // Initalizes subscription to onToggle, concerning the visibility of add task form (showAddTask).
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  // Form group, consisting of text, day and reminder fields with required validators.
  contactForm = new FormGroup({
    text: new FormControl(null, Validators.required),
    day: new FormControl(null, Validators.required),
    reminder: new FormControl(false),
  });

  ngOnInit(): void {}

  // Once component is destroyed, unsubscribed.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Gets triggered on submit, validates input fields, emits onAddTask event which triggers addTask(event).
  onSubmit() {
    const newTask = {
      text: this.contactForm.value.text,
      day: this.contactForm.value.day,
      reminder: this.contactForm.value.reminder,
    };

    this.error1 = this.contactForm.get('text')?.errors != null;
    this.error2 = this.contactForm.get('day')?.errors != null;

    if (this.error1 || this.error2) {
      return;
    }

    this.onAddTask.emit(newTask);

    this.contactForm.get('text')?.setValue('');
    this.contactForm.get('day')?.setValue('');
    this.contactForm.get('reminder')?.setValue('');
  }
}
