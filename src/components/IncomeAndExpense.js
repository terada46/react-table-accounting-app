import React from 'react';
import { Badge } from 'react-bootstrap';

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

export default IncomeAndExpense;