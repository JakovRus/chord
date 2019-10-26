import React from 'react';
import './styles.css';

export function Neighbors(props) {
  const {node} = props;

  return (
    <table className='neighbors-table'>
      <thead>
        <tr>
          <th>predecessor</th>
          <th>successor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{node.predecessor.id}</td>
          <td>{node.successor.id}</td>
        </tr>
      </tbody>
    </table>
  );
}
