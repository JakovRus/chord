import React from 'react';
import './styles.css'

export function Neighbors(props) {
  const {node} = props;

  return (
    <table className='neighbors-table'>
      <tr>
        <th>successor</th>
        <th>predecessor</th>
      </tr>
      <tr>
        <td>{node.successor.id}</td>
        <td>{node.predecessor.id}</td>
      </tr>
    </table>
  );
}
