import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: IMessage[] = [];

  get currentMessages(): IMessage[] {
    return this.messages;
  }

  addMessage(text: string, type: MessageType): void {
  }
}
