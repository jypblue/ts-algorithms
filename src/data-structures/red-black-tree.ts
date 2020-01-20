import {
  defaultCompare,
  ICompareFunction,
  Compare
} from '../util';
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
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        // 否则左查找
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key);
      node.right.parent = node;
      return node.right;
    } else {
      // 右查找
      return this.insertNode(node.right, key);
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      let parent = node.parent;
      const grandParent = parent.parent;

      // case A
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right;

        // case 1: 叔叔节点是红色 - 只重新赋值变色
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case 2: node is right child - left rotate
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }

          // case 3: node is left child - right rotate
          this.rotationLL(grandParent);
          // swap color
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }

      } else {
        // case b: parent is right child of grand parent
        const uncle = grandParent.left; // 那么uncle就是在left

        // case 1: uncle is read - only recoloring
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case 2: node is left child - left rotate
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }

          // case 3: node is right child - left rotate
          this.rotationRR(grandParent);
          // swap color
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BLACK;
  }

  getRoot() {
    return this.root;
  }


}


