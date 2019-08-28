/**
 * 优先队列
 * 有序队列，从小到大添加数据到队列中
 */

import {
  Compare,
  defaultCompare,
  ICompareFunction
} from '../util';


export default class PriorityQueue<T> {
  private items: T[];

  constructor(
    private compareFn: ICompareFunction<T> = defaultCompare, //比较函数，类型返回数字
    private compare: Compare = Compare.LESS_THAN //默认比较的枚举数字 -1
  ) {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  enqueue(element: T) {
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.compareFn(element, this.items[i]) === this.compare) {
        this.items.splice(i, 0, element);
        added = true;
        break;
       }
    }

    if (!added) {
      this.items.push(element);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0]
  }

  clear() {
    this.items = [];
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    return this.items;
  }


}

