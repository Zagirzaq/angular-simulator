import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IService } from '../interfaces/IService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  companyName: string = 'РУМТИБЕТ';
  isPageLoading: boolean = true;

  services: IService[] = [
    { id: 1, 
      icon: 'people-icon', 
      title: 'Опытный гид', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.' },
    { id: 2, 
      icon: 'shield-icon', 
      title: 'Безопасный поход', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.' },
    { id: 3, 
      icon: 'tag-icon', 
      title: 'Лояльные цены', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.' }
  ];

  tourLocation: string = '';
  tourDate: string = '';
  tourMembers: string = '';

  currentDate: string = '';
  private timerInterval: number | undefined;

  clickCounter: number = 0;
  activePanel: 'datetime' | 'counter' = 'datetime';
  liveText: string = '';

  constructor() {
    this.saveLastVisit();
    this.incrementVisitCount();
    this.demonstrateCollections();
  }

  ngOnInit(): void {
    this.startTimer();
    setTimeout(() => {
      this.isPageLoading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  isFormValid(): boolean {
    return this.tourLocation.trim() !== '' &&
           this.tourDate.trim() !== '' &&
           this.tourMembers.trim() !== '';
  }

  switchPanel(): void {
    this.activePanel = this.activePanel === 'datetime' ? 'counter' : 'datetime';
  }

  increment(): void {
    this.clickCounter++;
  }

  decrement(): void {
    if (this.clickCounter > 0) {
      this.clickCounter--;
    }
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    localStorage.setItem('lastVisit', new Date().toString());
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

  private startTimer(): void {
    this.updateDate();
    this.timerInterval = setInterval(() => this.updateDate(), 1000) as unknown as number;
  }

  private updateDate(): void {
    const now: Date = new Date();
    this.currentDate = now.toLocaleString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
}