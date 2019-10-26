import React from 'react';
import {FingerTable} from './table';
import './styles.css';
import {Neighbors} from './neighbors';

export function Node(props) {
  const {node, remove} = props;
  const onClick = () => remove(node.id);

  return (
    <div className='chord-node' onClick={onClick}>
      <div>{node.id}</div>
      <Neighbors node={node}/>
      <FingerTable node={node}/>
    </div>
  );
}