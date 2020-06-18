import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../../model/Task';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';

export class TaskDAOArray implements TaskDAO {
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    const tempTask = TestData.tasks.find(task => task.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(tempTask), 1);
    return of(tempTask);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(value => value.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category,
         searchText: string,
         status: boolean,
         priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(task: Task): Observable<Task> {
    const tempTask = TestData.tasks.find(value => value.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(tempTask), 1, task);
    return of(task);
  }

  private searchTasks(category: Category,
                      searchText: string,
                      status: boolean,
                      priority: Priority): Task[] {

    let allTasks = TestData.tasks;

    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(task =>
        task.title.toUpperCase().includes(searchText.toUpperCase()));
    }

    return allTasks;
  }
}
