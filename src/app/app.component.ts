import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  companyName: string = 'Р У М Т И Б Е Т';

  constructor() {
    this.saveLastVisit();
    this.incrementVisitCount();
    this.demonstrateCollections();
  }

  isPrimaryColor(color: Color): boolean {
    return Object.values(Color).includes(color);
  }

  private saveLastVisit(): void {
    const now: string = new Date().toString();
    localStorage.setItem('lastVisit', now);
  }

  private incrementVisitCount(): void {
    const visits: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', (visits + 1).toString());
  }

  private demonstrateCollections(): void {
    const numberCollection = new Collection<number>([10, 20, 30]);
    console.log('Числа:', numberCollection.getAll());
    numberCollection.replace(1, 99);
    console.log('После замены:', numberCollection.getAll());
    
    const stringCollection = new Collection<string>(['один', 'два', 'три']);
    console.log('Строки:', stringCollection.getAll());
    stringCollection.remove(0);
    console.log('После удаления:', stringCollection.getAll());
  }
}