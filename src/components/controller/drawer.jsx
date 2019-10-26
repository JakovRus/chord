import React from 'react';
import {Node} from '../node/node';

export function NodesDrawer(props) {
  const {length, nodes, add, remove} = props;
  const dots = Array.from({length}, (v, i) => i);

  const elements = dots.map(id => {
    const node = nodes.find(node => node.id === id);

    return node ?
      <Node node={node} key={id} remove={remove}/> :
      <Dot id={id} key={id} add={add}/>;
  });

  return <div className='elements'>{elements}</div>;
}

function Dot(props) {
  const {id, add} = props;

  const onClick = () => add(id);
  return (
    <div className='dot' onClick={onClick}>{id}</div>
  );
}