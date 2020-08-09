import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        pageIndex,
    }) => (
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
);

export default Pagination;