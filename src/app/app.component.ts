import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { IService } from '../interfaces/IService';
import { IPopularDestination } from '../interfaces/IPopularDestination';
import { IBlogArticle } from '../interfaces/IBlogArticle';
import { MessageType } from '../enums/MessageType';
import { MessageService } from './services/message.service';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {

  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  MessageType = MessageType;
  PAGE_LOADING_DELAY_MS: number = 2000;
  DATE_UPDATE_INTERVAL_MS: number = 1000;
  companyName: string = 'РУМТИБЕТ';
  isPageLoading: boolean = true;

  services: IService[] = [
    {
      id: 1,
      icon: 'people-icon',
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      icon: 'shield-icon',
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      icon: 'tag-icon',
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ];

  popularDestinations: IPopularDestination[] = [
    {
      id: 1,
      img: 'lake-by-the-mountains',
      rating: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      cost: '480'
    },
    {
      id: 2,
      img: 'night-in-the-mountains',
      rating: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      cost: '500'
    },
    {
      id: 3,
      img: 'stretching-in-the-mountains',
      rating: '5.0',
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      cost: '230'
    }
  ];

  blogArticles: IBlogArticle[] = [
    {
      id: 1,
      img: 'village-in-Italy',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      img: 'view-from-the-plane',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023'
    },
    {
      id: 3,
      img: 'alley',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      img: 'taj-mahal',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ];

  tourLocation: string = '';
  tourDate: string = '';
  tourMembers: string = '';
  currentDate: string = '';
  clickCounter: number = 0;
  activePanel: 'datetime' | 'counter' = 'datetime';
  liveText: string = '';
  private timerInterval: number | undefined;

  constructor() {
    this.saveLastVisit();
    this.incrementVisitCount();
    this.demonstrateCollections();
  }

  ngOnInit(): void {
    this.startTimer();
    setTimeout(() => {
      this.isPageLoading = false;
    }, this.PAGE_LOADING_DELAY_MS);
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

  onSwitchPanel(): void {
    this.activePanel = this.activePanel === 'datetime' ? 'counter' : 'datetime';
  }

  handleIncrement(): void {
    this.clickCounter++;
  }

  handleDecrement(): void {
    if (this.clickCounter > 0) {
      this.clickCounter--;
    }
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    this.localStorageService.setItem('lastVisit', new Date());
  }

  private incrementVisitCount(): void {
    const visits: number = this.localStorageService.getItem<number>('visitCount') || 0;
    this.localStorageService.setItem<number>('visitCount', visits + 1);
  }

  private demonstrateCollections(): void {
    const numberCollection: Collection<number> = new Collection<number>([10, 20, 30]);
    numberCollection.replace(1, 99);
    const stringCollection: Collection<string> = new Collection<string>(['один', 'два', 'три']);
    stringCollection.remove(0);
  }

  private startTimer(): void {
    this.updateDate();
    this.timerInterval = setInterval(() => this.updateDate(), this.DATE_UPDATE_INTERVAL_MS) as unknown as number;
  }

  private updateDate(): void {
    const now: Date = new Date();
    this.currentDate = now.toLocaleString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

}