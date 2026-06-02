export class Collection<T> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  getAll(): T[] {
    return [...this.items];
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  replace(index: number, newItem: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = newItem;
    }
  }
}