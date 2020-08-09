import React from 'react';
import { 
    useTable, 
    usePagination, 
    useGlobalFilter, 
    useSortBy 
} from 'react-table';
import { Table, Button } from 'react-bootstrap';
import GlobalFilter from './GlobalFilter';
import IncomeAndExpense from './IncomeAndExpense';
  
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