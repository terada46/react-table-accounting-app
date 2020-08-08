import React, { useReducer } from 'react';
import { getData } from './GetData';
import AddRow from './AddRow';
import ReactTable from './ReactTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialState = {
  columns: [
    {
      Header: '日期',
      accessor: 'date',
      sortDescFirst: true,
    },
    {
      Header: '收支',
      accessor: 'type',
    },
    {
      Header: '金额 (￥)',
      accessor: 'amount',
    },
    {
      Header: '种类',
      accessor: 'category',
    }
  ],
  rows: [...getData()]
}
const reducer = (state, action) => {
  switch (action.type) {
    case "add_row":
      const newRows = [...state.rows];
      newRows.push(action.payload);
      return {
        ...state,
        rows: newRows
      };
    default: throw new Error();
  }
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const addRow = row =>  {
    dispatch({type: "add_row", payload: row})
  }

  const columns = React.useMemo(() => state.columns, [state.columns]);
  const data = React.useMemo(() => state.rows, [state.rows]);

  return (
    <div id="table-container">
      <AddRow addRow={addRow} />
      <ReactTable columns={columns} data={data} />
    </div>
  )
}

export default App;
