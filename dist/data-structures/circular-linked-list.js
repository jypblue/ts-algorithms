"use strict";
/**
 * 循环队列
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const linked_list_1 = require("./linked-list");
const linked_list_models_1 = require("./models/linked-list-models");
class CircularLinkedList extends linked_list_1.default {
    constructor(equalsFn = util_1.defaultEquals) {
        super(equalsFn);
        this.equalsFn = equalsFn;
    }
    push(element) {
        const node = new linked_list_models_1.Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.getElementAt(this.size() - 1);
            current.next = node;
        }
        // 将链尾指向链首，组成循环链表
        node.next = this.head;
        this.count++;
    }
    insert(element, index) {
    }
}
exports.default = CircularLinkedList;
