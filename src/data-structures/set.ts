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

  // 合并传入的Set, 取并集
  union(otherSet: Set<T>) {
    const unionSet = new Set<T>();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  // 合并传入的Set，取交集
  intersection(otherSet: Set<T>) {
    const intersectionSet = new Set<T>();
    const values = this.values();
    const otherValues = otherSet.values();

    let biggerSet = values;
    let smallerSet = otherValues;

    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }

    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });

    return intersectionSet;
  }

  // 两个队列取差集
  difference(otherSet:Set<T>) {
    const differenceSet = new Set<T>();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  // 当前队列是不是其它队列的子集
  isSubsetOf(otherSet: Set<T>) {
    if (this.size() > otherSet.size()) {
      return false;
    }

    let isSubset = true;
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });


    return isSubset;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.items).length;
  }

  clear() {
    this.items = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const values = this.values();
    const objString = values.join(',');
    return objString;
  }

}
