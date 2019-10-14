import { ValuePair } from "./models/value-pair";
import { defaultToString } from "../util";

/**
 * 散列表 -线性探查
 */



export default class HashTableLinearProbing<K, V> {
  protected table: { [key: string]: ValuePair<K, V> };
  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {}
  }

  private loseloseHashCode(key: K) {
    if (typeof key === 'number') {
      return key;
    }

    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key: K) {
    return this.loseloseHashCode(key);
  }

  put(key: K, value: V) {

  }

  get(key: K) {

  }

  remove(key: K) {

  }

  private verifyRemoveSideEffict(key: K, removedPosition: number) {

  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.table).length;
  }

  clear() {
    this.table = {};
  }

  getTable() {
    return this.table;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
