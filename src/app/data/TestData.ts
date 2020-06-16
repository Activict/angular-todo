import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {Priority} from '../model/Priority';

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Работа'},
    {id: 2, title: 'Семья'},
    {id: 3, title: 'Учеба'},
    {id: 4, title: 'Отдых'},
    {id: 5, title: 'Спорт'},
    {id: 6, title: 'Еда'},
    {id: 7, title: 'Финансы'},
    {id: 8, title: 'Гаджеты'},
    {id: 9, title: 'Здоровье'},
    {id: 10, title: 'Автомобиль'},
  ];

  static proirities: Priority[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Средний', color: '#85D1B2'},
    {id: 3, title: 'Высокий', color: '#F1828D'},
    {id: 4, title: 'Срочный', color: '#F1128D'},
  ];


  static tasks: Task[] = [
    {
      id: 1,
      title: 'Заправить машину',
      priority: TestData.proirities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2020-07-01')
    },

    {
      id: 2,
      title: 'Передать отчеты в отдел',
      priority: TestData.proirities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2020-07-02')
    },

    {
      id: 3,
      title: 'Приготовить ужин',
      priority: TestData.proirities[2],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2020-06-20')
    },

    {
      id: 4,
      title: 'Сходить на выставку Ван Гога',
      priority: TestData.proirities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2020-07-20')
    },

    {
      id: 5,
      title: 'Изучить Ангуляр',
      completed: false,
      category: TestData.categories[2],
    },

    {
      id: 6,
      title: 'Сходить на митап по программированию',
      priority: TestData.proirities[1],
      completed: true,
      category: TestData.categories[2],
      date: new Date('2020-06-01')
    },

    {
      id: 7,
      title: 'Изучить маршрут для водного похода',
      priority: TestData.proirities[2],
      completed: false,
      category: TestData.categories[3],
      date: new Date('2020-06-25')
    },

    {
      id: 8,
      title: 'Зайти в магазин за продуктами',
      completed: false,
      category: TestData.categories[5],
    },
  ];
}
