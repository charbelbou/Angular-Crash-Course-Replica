import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  // two inputs which are passed in from parent component, 'text' and 'color'.
  @Input() text!: string;
  @Input() color!: string;

  // Event emitter.
  @Output() btnClick = new EventEmitter();

  // onClick is triggered once button is clicked, which emits btnClick,
  // which in turn triggers toggleAddTask() (Passed through component).
  onClick() {
    this.btnClick.emit();
  }
  constructor() {}

  ngOnInit(): void {}
}
