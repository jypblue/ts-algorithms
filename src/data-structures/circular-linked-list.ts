/**
 * 循环队列
 */


import {
  defaultEquals,
  IEqualsFunction
} from '../util';

import LinkedList from './linked-list';
import { Node } from './models/linked-list-models';

export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  push(element: T) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }

    // 将链尾指向链首，组成循环链表
    node.next = this.head;
    this.count++;
  }

  insert(element: T, index: number) {

  }


}
