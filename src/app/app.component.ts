import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  companyName: string = 'румтибет';

  constructor() {
    this.saveLastVisit();
    this.incrementVisitCount();
    this.demonstrateCollections();
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
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
    const numberCollection: Collection<number> = new Collection<number>([10, 20, 30]);
    numberCollection.replace(1, 99);

    const stringCollection: Collection<string> = new Collection<string>(['один', 'два', 'три']);
    stringCollection.remove(0);
  }

}