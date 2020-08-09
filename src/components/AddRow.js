import React, { useState, forwardRef } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { getCategories } from '../stores/GetData';
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from "react-datepicker";
import zhCN from 'date-fns/locale/zh-CN';
import { format } from 'date-fns/esm';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('zhCN', zhCN)

const AddRow = ({ addRow }) => {
    const [ startDate, setStartDate ] = useState(new Date());
    const { register, errors, handleSubmit } = useForm({
        mode: "onChange"
    });

    const CustomInput = forwardRef((props, ref) => {
        const { value, onClick } = props;
        return (
            <Button ref={ref} variant="light" size="sm" onClick={onClick}>
                {value}
            </Button>
        )
    });
    const ref = React.createRef();

    const onSubmit = (data, e) => {
        const { amount, type, category } = data;
        addRow({
            date: format(startDate,  "yyyy年M月d日"), 
            type: type,
            amount: Number.parseFloat(amount).toFixed(2),
            category: category
        });
        e.target.reset();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)} id="inputForm">
        <Form.Row>
            <Col sm="2" xs={4} className="mr-0 mb-3">
                <Form.Label htmlFor="amount" srOnly>日期</Form.Label>
                <DatePicker 
                    selected={startDate} 
                    dateFormat="yyyy/MM/dd"
                    locale={zhCN}
                    onChange={date => setStartDate(date)} 
                    customInput={<CustomInput ref={ref} />}
                />
            </Col>
            <Col sm="2" className="mr-3">
                <Form.Label htmlFor="amount" srOnly>金额</Form.Label>
                <Form.Control 
                    name="amount" 
                    size="sm" 
                    placeholder="填入金额..."
                    ref={register({
                        required: "请填入一个金额.",
                        pattern: {
                            value: /\d+/,
                            message: "请填入有效数字"
                        }
                    })}
                />
                {errors.amount && <p className="message">{errors.amount.message}</p>}
            </Col>
            <Col sm="2" className="mr-3">
                <Form.Label htmlFor="type" srOnly>收支</Form.Label>
                <Form.Control 
                    as="select"
                    size="sm" 
                    name="type"
                    ref={register({
                        required: "此项为必选项"
                    })}
                >
                <option value={''}>选择收支</option>
                <option value={"支出"}>支出</option>
                <option value={"收入"}>收入</option>
                </Form.Control>
                {errors.type && <p className="message">{errors.type.message}</p>}
            </Col>
            <Col sm="2" className="mr-2">
                <Form.Label htmlFor="type" srOnly>种类</Form.Label>
                <Form.Control 
                    as="select" 
                    name="category" 
                    size="sm" 
                    ref={register({
                        required: "此项为必选项",
                    })}
                >   
                    <option value={''}>选择分类</option>
                    {getCategories().map((option, i) => (
                        <option key={i} value={option || ''}>
                        {option}
                        </option>
                ))}
                </Form.Control>
                {errors.category && <p className="message">{errors.category.message}</p>}
            </Col>
            <Col sm="3" className="ml-2"> 
                <Button variant="secondary" type="submit" size="sm" className="px-3">
                    添加
                </Button>
            </Col> 
            </Form.Row>
      </Form>
    )
  }

  export default AddRow;