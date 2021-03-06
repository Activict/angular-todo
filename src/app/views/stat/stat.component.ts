import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  completeTaskInCategory: number;

  @Input()
  totalTaskInCategory: number;

  @Input()
  uncompleteTaskInCategory: number;

  @Input()
  showStat: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
