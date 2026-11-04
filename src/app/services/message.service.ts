import { Injectable } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageType } from '../../enums/MessageType';

@Injectable()
export class MessageService {

  private messages: IMessage[] = [];
  private lastId: number = 0;
  private MESSAGE_LIFETIME_MS: number = 5000;

  get currentMessages(): IMessage[] {
    return this.messages;
  }

  addMessage(text: string, type: MessageType): void {
    this.lastId += 1;

    const message: IMessage = {
      id: this.lastId,
      text: text,
      type: type,
    };
    this.messages = [message, ...this.messages];
    setTimeout(() => {
      this.closeMessage(message.id);
    }, this.MESSAGE_LIFETIME_MS);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== id);
  }

}
