"use strict";
/**
 * 链表-基本链表
 * 链表就像火车车厢的连接方式
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const linked_list_models_1 = require("./models/linked-list-models");
class LinkedList {
    constructor(equalsFn = util_1.defaultEquals) {
        this.equalsFn = equalsFn;
        this.count = 0;
    }
    // 向链表中添加元素
    push(element) {
        const node = new linked_list_models_1.Node(element);
        let current;
        if (this.head === null) {
            this.head = node;
        }
        else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    // 获取链表节点，传入序号
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new linked_list_models_1.Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            }
            else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
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
                this.head = current.next;
            }
            else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getHead() {
        return this.head;
    }
    clear() {
        this.head = undefined;
        this.count = 0;
    }
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 0; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
exports.default = LinkedList;
