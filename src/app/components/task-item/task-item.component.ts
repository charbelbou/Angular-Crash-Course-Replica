import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  // Task object, passed from parent component
  @Input() task!: Task;

  // Two event emitters, onDeleteTask and onToggleReminder.
  // Once emitted, they trigger deleteTask(task) and toggleReminder(task), respectively.
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  // Initalizing faTimes, used in HTML for delete icon.
  faTimes = faTimes;

  // Triggered when delete icon is pressed
  // emits onDeleteTask, which triggers deleteTask(task) from parent component.
  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  // Triggered when task is double clicked
  // emits onToggleReminder, which triggers toggleReminder(task) from parent component.
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  constructor() {}

  ngOnInit(): void {}
}
