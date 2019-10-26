import React from 'react';
import './styles.css';

export function Neighbors(props) {
  const {node} = props;

  return (
    <table className='neighbors-table'>
      <thead>
        <tr>
          <th>successor</th>
          <th>predecessor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{node.successor.id}</td>
          <td>{node.predecessor.id}</td>
        </tr>
      </tbody>
    </table>
  );
}
