/**
 * 集合
 */

export default class Set<T> {
  private items: any;

  constructor() {
    this.items = {};
  }

  add(element: T) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element: T) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element: T) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  values(): T[] {
    return Object.values(this.items);
  }

  union(otherSet: Set<T>) {
    const unionSet = new Set<T>();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  intersection() {

  }

  difference() {

  }

  isSubsetOf() {

  }

  isEmpty() {

  }

  size() {

  }

  clear() {

  }

  toString() {

  }

}
