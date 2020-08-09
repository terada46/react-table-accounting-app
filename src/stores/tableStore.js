import createStore from './createStore';
import { getData } from './GetData';

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

let [ TableStoreProvider, useTableStore ] = createStore(
    ({ state, setState }) => {
        const increment = row => {
            setState(prevState => {
                const newRows = [...prevState.rows];
                newRows.push(row);
                return {
                ...prevState,
                rows: newRows
                };
            });
        };
    
        const columns = state.columns;
        const data = state.rows;
    
        return {
            increment,
            columns,
            data
        }; 
    },
    initialState
);

export { TableStoreProvider, useTableStore };