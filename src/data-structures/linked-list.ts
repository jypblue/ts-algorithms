/**
 * 链表-基本链表
 */

import { defaultEquals, IEqualsFunction } from '../util';
import { Node } from './models/linked-list-models';

export default class LinkedList<T> {
  protected count = 0;
  protected head: Node<T> | undefined;

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) { }

  push(element:T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {

    }
  }
}
