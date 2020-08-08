import React, { useState } from 'react';
import { 
    useTable, 
    usePagination, 
    useGlobalFilter, 
    useAsyncDebounce, 
    useSortBy 
} from 'react-table';
import { Table, Button, Form, Badge } from 'react-bootstrap';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => { 
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200);
    const options = React.useMemo(() => {
        const options = new Set();
        preGlobalFilteredRows.forEach(row => {
            let value, regexp = /^\d{4}年\d{1,2}月/;
            if (regexp.test(row.values.date)) {
                value = row.values.date.match(regexp)[0]
            } else {
                value = row.values.date
            }
            options.add(value);
            });
        return [...options.values()]
    }, [preGlobalFilteredRows]);

    return (
        <div className="filter">
            <Form.Control 
                as="select" 
                custom
                size="sm"
                value={value}
                onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
                }}
            >
                <option value="">所有</option>
                {options.map((option, i) => (
                    <option key={i} value={option || ''}>
                        {option}
                    </option>
                ))}
            </Form.Control>
        </div>
    )
};
  
const IncomeAndExpense = ({ rows, globalFilter }) => {
    let income = 0, expense = 0;
    rows.forEach(cell => {
        const { amount, type } = cell.values;
        type === "支出" ? expense += Number(amount) : income += Number(amount);
    });
    return (
        <div id="current-month">
            { globalFilter === undefined 
                ? <span>所有 合计</span> 
                : <span>{`${globalFilter} 合计`}</span> 
            }
            <Badge variant="success">收入</Badge>
            <span>{`￥${parseFloat(income).toFixed(2)}`}</span>
            <Badge variant="warning">支出</Badge>
            <span>{`￥${parseFloat(expense).toFixed(2)}`}</span>
        </div>
    )
}
  
const ReactTable = ({ columns, data }) => {
    const defaultSortBy = React.useMemo(() => [
        {
            id: 'date',
            desc: true,
        }
    ],[]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        preGlobalFilteredRows,
        setGlobalFilter,
        rows,
        state: { pageIndex, globalFilter }
    } = useTable(
        {
            columns,
            data,
            autoResetGlobalFilter: true,
            defaultCanSort: true,
            initialState: { 
                sortBy: defaultSortBy,
                pageSize: 10,
                pageIndex: 0 
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );
    return (
        <>
            <div id="header">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <IncomeAndExpense rows={rows} globalFilter={globalFilter} />
            </div>
            <Table bordered striped hover responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                const { render, getHeaderProps } = column;
                                return (
                                    <th className="col-th" 
                                        {...getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <span id="triangle-reverse"></span>
                                                    : <span id="triangle"></span>
                                                : ''
                                            }
                                        </span>
                                    </th>
                                )
                            })}
                        </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div id="pagination">
                <div id="pageButtons">
                <Button 
                    variant="outline-secondary mr-2" 
                    size="sm" 
                    onClick={() => gotoPage(0)} 
                    disabled={!canPreviousPage}
                >
                    {'首页'}
                </Button>
                <Button 
                    variant="outline-secondary mr-2" 
                    size="sm" 
                    onClick={() => previousPage()} 
                    disabled={!canPreviousPage}
                >
                    {'上一页'}
                </Button>
                <Button 
                    variant="outline-secondary mr-2" 
                    size="sm" 
                    onClick={() => nextPage()} 
                    disabled={!canNextPage}
                >
                    {'下一页'}
                </Button>
                <Button 
                    variant="outline-secondary mr-2" 
                    size="sm" 
                    onClick={() => gotoPage(pageCount - 1)} 
                    disabled={!canNextPage}
                >
                    {'末页'}
                </Button>
                </div>
                <div id="pageInput">
                <span>
                    Page&nbsp;
                    <b>
                        {pageIndex + 1} / {pageOptions.length}
                    </b>&nbsp;
                </span>
                <span>
                    | 跳转到: &nbsp;
                    <input
                    type="number"
                    min="1"
                    max={pageCount}
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    />
                </span>
                </div>
            </div>
        </>
    );
};

export default ReactTable;