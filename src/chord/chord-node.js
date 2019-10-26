export class ChordNode {
  constructor(m, id) {
    this.m = m;
    this.id = id;
    this.table = [];

    for(let i = 0; i < m; i++) {
      this.table[i].node = this;
    }

    this.predecessor = this;
    this.successor = this;
  }

  // node: ChordNode | undefined;
  join = (node) => {
    if(!node) {
      return;
    }

    this.init_table(node);
    this.update_others();
  };

  // node: ChordNode | undefined;
  init_table = (node) => {
    const first_finger = this.table[0];
    first_finger.node = node.find_successor(first_finger.start);
    this.successor = first_finger.node;

    this.predecessor = this.successor.predecessor;
    this.successor.predecessor = this;

    for(let i = 0; i < this.m - 1; i++) {
      const finger = this.table[i];
      const prev_finger = this.table[i - 1];

      if(finger.start >= this.id && finger.start < prev_finger.node.id) {
        finger.node = prev_finger.node;
      } else {
        finger.node = node.find_successor(finger.start);
      }
    }
  };

  update_others = () => {
    for(let i = 0; i < this.m; i++) {
      const id = this.id - Math.pow(2, i);
      const predecessor = this.find_predecessor(id);
      predecessor.update_finger_table(this.id, i);
    }
  };

  update_finger_table = (node, i) => {
    if(node.id >= this.id && node.id < this.table[i].node.id) {
      this.table[i].node = node;
      this.predecessor.update_finger_table(node, i);
    }
  };

  find_successor = (id) => {
    return this.find_predecessor(id).successor;
  };

  find_predecessor = (id) => {
    let node = this;
    while(id <= node.id || id > node.successor.id) {
      node = node.closest_preceding_finger(id);
    }

    return node;
  };

  closest_preceding_finger = (id) => {
    for(let i = this.m - 1; i >= 0; i--) {
      const finger = this.table[i].node;
      if(finger.id > this.id && finger.id < id) {
        return finger;
      }
    }

    return this;
  }
}