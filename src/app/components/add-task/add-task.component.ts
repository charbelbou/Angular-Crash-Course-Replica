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
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  showAddTask: boolean = false;
  subscription: Subscription;
  error1: boolean = false;
  error2: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  contactForm = new FormGroup({
    text: new FormControl(null, Validators.required),
    day: new FormControl(null, Validators.required),
    reminder: new FormControl(false),
  });

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
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
