import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';

  constructor() {
    this.saveLastVisit();
    this.incrementVisitCount();
    this.demonstrateCollections();
  }

  isPrimaryColor(color: string): boolean {
    return Object.values(Color).includes(color as Color);
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
    numberCollection.replace(1, 99);

    const stringCollection = new Collection<string>(['один', 'два', 'три']);
    stringCollection.remove(0);
  }

}