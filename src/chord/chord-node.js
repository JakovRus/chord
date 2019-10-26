export class ChordNode {
  constructor(m, id) {
    this.m = m;
    this.size = Math.pow(2, m);
    this.id = id;
    this.table = [];

    for(let i = 0; i < m; i++) {
      const finger = {
        node: this,
        start: (id + Math.pow(2, i)) % this.size,
      };

      this.table.push(finger);
    }

    this.predecessor = this;
    this.successor = this;
  }

  leave = () => {
    this.successor.predecessor = this.predecessor;
    this.predecessor.successor = this.successor;
    this.update_others();
  };

  join = (node) => {
    if(!node) {
      return;
    }

    this.init_table(node);
    this.update_others();
  };

  init_table = (node) => {
    const first_finger = this.table[0];
    first_finger.node = node.find_successor(first_finger.start);

    this.successor = first_finger.node;
    this.predecessor = this.successor.predecessor;

    this.successor.predecessor = this;
    this.predecessor.successor = this;

    for(let i = 1; i < this.m; i++) {
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
      const id = (this.size + this.id - Math.pow(2, i)) % this.size;
      const predecessor = this.find_predecessor(id);
      predecessor.update_finger_table(this, i);
    }
  };

  update_finger_table = (node, i) => {
    if(node.id >= this.id && node.id < this.table[i].node.id) {
      this.table[i].node = node;
      this.predecessor.update_finger_table(node, i);
    }
  };

  find_successor = (id) => {
    for(let i = 0; i < this.m; i++) {
      const finger = this.table[i];

      if(finger.start === id) {
        return finger.node;
      }

      if(this.in_interval(id, i)) {
        return id > finger.node ? finger.node.find_successor(id) : finger.node;
      }
    }
  };

  find_predecessor = (id) => {
    return this.find_successor(id).predecessor;
  };

  in_interval = (id, i) => {
    const finger = this.table[i];
    const next_finger = this.table[i + 1];

    const start = finger.start;
    const end = next_finger ? next_finger.start : this.id;

    return start < end ?
      (id > start && id < end):
      ((id > start && id < this.size) || (id >= 0 && id < end));
  }
}