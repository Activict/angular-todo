import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  tasksApp: Task[];
  categoriesApp: Category[];
  selectedCategory: Category;

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasksApp = tasks);
    this.dataHandler
      .getAllCategories()
      .subscribe(categories => this.categoriesApp = categories);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasksApp = tasks;
    });
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasksApp = tasks;
      });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasksApp = tasks;
      });
    });
  }
}
