"use strict";
/**
 * 双向链表
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const linked_list_1 = require("./linked-list");
const linked_list_models_1 = require("./models/linked-list-models");
class DoublyLinkedList extends linked_list_1.default {
    constructor(equalsFn = util_1.defaultEquals) {
        super(equalsFn);
        this.equalsFn = equalsFn;
    }
    // 链表尾部添加Node元素
    push(element) {
        const node = new linked_list_models_1.DoublyNode(element);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.count++;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new linked_list_models_1.DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                }
                else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            }
            else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            }
            else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = this.head.next;
                if (this.count === 1) {
                    this.tail = undefined;
                }
                else {
                    this.head.prev = undefined;
                }
            }
            else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            }
            else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    indexOf(element) {
        let current = this.head;
        let index = 0;
        // 循环往后移动，如果有相等的两个元素的就返回对应的序列号
        while (current != null) {
            if (this.equalsFn(element, current.element)) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
    clear() {
        super.clear();
        this.tail = undefined;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        while (current != null) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
    inverseToString() {
        if (this.tail == null) {
            return '';
        }
        let objString = `${this.tail.element}`;
        let previous = this.tail.prev;
        while (previous != null) {
            objString = `${objString},${previous.element}`;
            previous = previous.prev;
        }
        return objString;
    }
}
exports.default = DoublyLinkedList;
