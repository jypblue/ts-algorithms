"use strict";
/**
 * 优先队列
 * 有序队列，从小到大添加数据到队列中
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class PriorityQueue {
    constructor(compareFn = util_1.defaultCompare, //比较函数，类型返回数字
    compare = util_1.Compare.LESS_THAN //默认比较的枚举数字 -1
    ) {
        this.compareFn = compareFn;
        this.compare = compare;
        this.items = [];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    enqueue(element) {
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
        return this.items[0];
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
exports.default = PriorityQueue;
