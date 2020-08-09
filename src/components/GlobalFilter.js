import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Form } from 'react-bootstrap';

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

export default GlobalFilter;
  