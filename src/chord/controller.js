import {ChordNode} from './chord-node';

export class ChordController {
  constructor(m) {
    this.m = m;
    this.nodes = [];
  }

  add = (id) => {
    const node = new ChordNode(this.m, id);
    node.join(this.nodes[0]);
    this.nodes.push(node);
  };

  remove = (id) => {
    const node = this.nodes[id];

    if(!node) {
      return;
    }

    node.leave();
    this.nodes = this.nodes.filter(node => node.id !== id);
  }
}