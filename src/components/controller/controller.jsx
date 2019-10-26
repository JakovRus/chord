import React, {useState} from 'react';
import {ChordNode} from '../../chord/chord-node';
import {NodesDrawer} from './drawer';
import './style.css';

const m = 3;
const SIZE = Math.pow(2, m);

export function Controller() {
  const [nodes, setNodes] = useState([]);

  const add = (id) => {
    if(nodes.length > SIZE || id > SIZE - 1) {
      return;
    }

    const node = new ChordNode(m, id);
    node.join(nodes[0]);
    setNodes(nodes.concat(node));
  };

  const remove = (id) => {
    const node = nodes.find(node => node.id === id);

    if(!node) {
      return;
    }

    node.leave();
    setNodes(nodes.filter(node => node.id !== id));
  };

  return (
    <div className='container'>
      <div className='row-container'>
        <div className='row'/>
        <NodesDrawer length={SIZE} nodes={nodes} add={add} remove={remove} />
      </div>
    </div>
  );
}