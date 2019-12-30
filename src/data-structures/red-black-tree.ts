import {
  defaultCompare,
  ICompareFunction,
  Compare
} '../util';
import BinarySearchTree from './binary-search-tree';
import { RedBlackNode, Colors } from './models/red-black-node';


/**
 *
 *
 * @export
 * @class RedBlackTree
 * @extends {BinarySearchTree<T>}
 * @template T
 */
export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T>;
  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *  node: b; tmp: a;
   * @param node  Node<T>
   */
  private rotationLL(node: RedBlackNode<T>) {
    const tmp = node.left; // tmp = a;
    node.left = tmp.right;  // b => left = d;
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node; // d => parent = b;
    }
    tmp.parent = node.parent; // a => parent = b => parent = null/有值

    // 根节点
    if (!node.parent) {
      this.root = tmp; // 没父节点说明就是根节点
    } else {
      if (node === node.parent.left) { // 如果有父节点，就把之前node的父节点指向从node转移到tmp节点来
        node.parent.left = tmp;
      } else {
        node.parent.right = tmp;
      }
    }

    // 最后将旋转后的节点连接起来
    tmp.right = node; // a => right = b;
    node.parent = tmp; // b => parent = a;
  }


   /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *  node:a ; tmp: b
   * @param node Node<T>
   */

  private rotationRR(node: RedBlackNode<T>) {
    const tmp = node.right; // b
    node.right = tmp.left; // a => right: d

    if (tmp.left && tmp.left.key) { // if has d
      tmp.left.parent = node; // d => parent: a
    }
    tmp.parent = node.parent; // b => parent: a=>parent ? null or has key
    if (!node.parent) { // null
      this.root = node;  // root 就是 a
    } else {
      if (node === node.parent.left) { // a 是树左边
        node.parent.left = tmp; // 就把 b放到左边
      } else {
        node.parent.right = tmp; // 否则就是右边
      }
    }

    tmp.left = node; //  b => left: a
    node.parent = tmp; // a => parent: b
  }

  insert(key: T) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {

  }

  private fixTreeProperties(node: RedBlackNode<T>) {

  }


}


