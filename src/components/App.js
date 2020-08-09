import React from 'react';
import AddRow from './AddRow';
import ReactTable from './ReactTable';
import { useTableStore } from '../stores/tableStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const App = () => {
  let { increment, columns, data } = useTableStore();

  return (
    <div id="table-container">
      <AddRow addRow={increment} />
      <ReactTable columns={columns} data={data} />
    </div>
  )
}

export default App;
