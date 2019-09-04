"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
exports.Node = Node;
class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.element = element;
        this.next = next;
        this.prev = prev;
    }
}
exports.DoublyNode = DoublyNode;
