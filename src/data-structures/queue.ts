/**
 * 队列
 */

export default class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: any;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  size() {
    return this.count - this.lowestCount;
  }

  isEmpty() {
    return this.size() === 0;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
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