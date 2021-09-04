import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  // On initialization, call getTasks from taskService, then subscribe to it and assign
  // the data it returns to 'tasks'.
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  // Function to delete task, passes Task object as parameter.
  // call deleteTask from taskService and pass the task as parameter
  // subscribe, and filter out the deleted task using it's id.
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id != task.id))
      );
  }

  // Function to toggle reminder on a task, pass Task object as parameter.
  // invert the 'reminder' boolean, then update using task service function 'updateTaskReminder'
  // pass task to function then subscribe.
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  // Function to add task, pass Task object as parameter.
  // Calls taskService.addTask and passes task as parameter.
  // Subscribe, then add the returned object to the array of tasks. (' tasks')
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
