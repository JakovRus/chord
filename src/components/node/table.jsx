import React from 'react';
import './styles.css';

export function FingerTable(props) {
  const {node} = props;

  return (
    <table className='finger-table'>
      <thead>
        <tr>
          <th>start</th>
          <th>interval</th>
          <th>node</th>
        </tr>
      </thead>
      <Fingers node={node}/>
    </table>
  );
}

function Fingers(props) {
  const {node} = props;

  const fingers = node.table.map((finger, index, array)  => {
    const nextFinger = array[index + 1];
    const end = nextFinger ? nextFinger.start : node.id;

    return <Finger finger={finger} end={end} key={index} />
  });

  return <tbody>{fingers}</tbody>
}

function Finger(props) {
  const {finger, end} = props;

  return (
    <tr>
      <td>{finger.start}</td>
      <td>[{finger.start},{end})</td>
      <td>{finger.node.id}</td>
    </tr>
  );
}