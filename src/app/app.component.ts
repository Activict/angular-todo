import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  tasksApp: Task[];
  categoriesApp: Category[];
  priorities: Priority[];

  selectedCategory: Category = null;
  priorityFilter: Priority;
  private searchTaskText = '';
  private statusFilter: boolean;
  private searchCategoryText = '';

  constructor(
    private dataHandler: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasksApp = tasks);
    this.dataHandler
      .getAllPriorities()
      .subscribe(priorities => this.priorities = priorities);
    this.dataHandler
      .getAllCategories()
      .subscribe(categories => this.categoriesApp = categories);

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
      if (!this.categoriesApp.includes(this.selectedCategory)) {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
      }
    });
  }

  onAddCategory(categoryTitle: string) {
    this.dataHandler.addCategory(categoryTitle).subscribe(() => {
      this.updateCategories();
    });
  }

  onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categoriesApp = categories;
    });
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.updateTasks();
    });
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => {
        this.categoriesApp = categories;
      }
    );
  }

  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks();
    });
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasksApp = tasks;
    });
  }
}
