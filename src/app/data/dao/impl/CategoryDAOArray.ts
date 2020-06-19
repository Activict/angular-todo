import {CategoryDAO} from '../interface/CategoryDAO';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDAOArray implements CategoryDAO {

  add(categoryTitle: string): Observable<Category> {
    const id = this.getLastidCategory();
    const newCategory = new Category(id, categoryTitle);
    TestData.categories.push(newCategory);
    return of(newCategory);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

    return of(tmpCategory);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);
    return of(tmpCategory);
  }

  private getLastidCategory() {
    return Math.max.apply(Math, TestData.categories.map(cat => cat.id)) + 1;
  }
}
