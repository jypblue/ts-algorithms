/**
 * 图
 *
 */

//  引入字典数据结构
import Dictionary from './dictionary';

export default class Graph {
  // 图的点数组
  private vertices: (string | number)[] = [];
  // 图的边数组
  private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary();

  constructor(private isDirected = false) { }

  // 添加点
  addVertex(v: string | number) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []); // 初始化点关联边的数组
    }
  }
  // 添加边
  addEdge(a: string | number, b: string | number) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }
    this.adjList.get(a).push(b);
    if (this.isDirected !== true) {
      this.adjList.get(b).push(a);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + ' -> ';
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + '';
      }
      s += '\n';
    }
    return s;
  }

}
