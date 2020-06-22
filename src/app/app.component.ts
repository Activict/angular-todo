import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './service/intro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';

  categoryMap = new Map<Category, number>();

  tasksApp: Task[];
  categoriesApp: Category[];
  priorities: Priority[];

  selectedCategory: Category = null;
  priorityFilter: Priority;
  private searchTaskText = '';
  private statusFilter: boolean;
  private searchCategoryText = '';

  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;

  showStat = true;

  constructor(
    private dataHandler: DataHandlerService,
    private introService: IntroService,
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

    this.fillCategories();
    this.onSelectCategory(null);

    this.introService.startIntroJS(true);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  fillCategories() {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categoriesApp = this.categoriesApp.sort((a, b) =>
      a.title.localeCompare(b.title));

    this.categoriesApp.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(value =>
        this.categoryMap.set(cat, value));
    });
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
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
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }

  onDeleteTask(taskDel: Task) {
    this.dataHandler.deleteTask(taskDel.id).pipe(
      concatMap(task => {
        return this.dataHandler.getUncompletedCountInCategory(task.category)
          .pipe(map(value => {
            return ({t: task, value});
          }));
      })).subscribe(result => {

      const t = result.t as Task;

      if (t.category) {
        this.categoryMap.set(t.category, result.value);
      }

      this.updateTasksAndStat();
    });
  }

  onAddTask(taskAdd: Task) {
    this.dataHandler.addTask(taskAdd).pipe(
      concatMap(task => {
        return this.dataHandler.getUncompletedCountInCategory(task.category)
          .pipe(map(value => {
            return ({t: task, value});
          }));
      })).subscribe(result => {

      const t = result.t as Task;

      if (t.category) {
        this.categoryMap.set(t.category, result.value);
      }

      this.updateTasksAndStat();
    });
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

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => {
        this.categoriesApp = categories;
      }
    );
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

  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3];
      });
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }
}
