export default class Stack<T> {
  private count: number;
  private items: any;

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  isEmpty() {
    return this.count === 0;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  size() {
    return this.count;
  }

  clear() {
    this.count = 0;
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    let str = '';
    Object.keys(this.items).forEach(key => {
      str = `${str},${this.items[key]}`;
    });

    return str;
  }
}
