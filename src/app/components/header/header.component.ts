import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // title, used in <h1>
  title = 'Task-Tracker';

  // Boolean which determines whether form is visible or not.
  showAddTask: boolean = false;
  subscription!: Subscription;

  // Initalizes subscription to onToggle, concerning the color/text of button.
  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  ngOnDestory() {
    this.subscription.unsubscribe();
  }

  // Invoked when button is clicked using uiService.
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  // Checks whether the current route is equal to the route that's passed in the parameter
  // Used to determine whether the button should be visible (Should be visible if on '/' route),
  // as we don't want the button to be visible when on the about page (/about)
  hasRoute(route: string) {
    return this.router.url === route;
  }
}
