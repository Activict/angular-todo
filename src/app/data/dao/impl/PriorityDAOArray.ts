import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../../model/Priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class PriorityDAOArray implements PriorityDAO {

  static priorities = TestData.proirities;

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    PriorityDAOArray.priorities.push(priority);

    return of(priority);
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = PriorityDAOArray.priorities.find(t => t.id === id);
    PriorityDAOArray.priorities
      .splice(PriorityDAOArray.priorities.indexOf(tmpPriority), 1);

    return of(tmpPriority);
  }

  get(id: number): Observable<Priority> {
    return of(PriorityDAOArray.priorities.find(priority => priority.id === id));
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.proirities);
  }

  update(priority: Priority): Observable<Priority> {
    const tmpPriority = PriorityDAOArray.priorities.find(t => t.id === priority.id);
    PriorityDAOArray.priorities
      .splice(PriorityDAOArray.priorities.indexOf(tmpPriority), 1, priority);

    return of(priority);
  }

  private getLastIdPriority() {
    return Math.max.apply(Math, TestData.proirities.map(p => p.id)) + 1;
  }
}
