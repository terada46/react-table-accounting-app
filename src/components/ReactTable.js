import React from 'react';
import { 
    useTable, 
    usePagination, 
    useGlobalFilter, 
    useSortBy 
} from 'react-table';
import { Table } from 'react-bootstrap';
import GlobalFilter from './GlobalFilter';
import IncomeAndExpense from './IncomeAndExpense';
import Pagination from './Pagination';
  
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
            <Pagination 
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                pageIndex={pageIndex}
            />
        </>
    );
};

export default ReactTable;