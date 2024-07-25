import * as React from 'react';

import { Form } from 'react-bootstrap';
import {  getIn } from 'formik';

const FieldInputTextarea = ({ field, form, ...props }: any) => {
    const error = getIn(form.errors, field.name);
    const touch = getIn(form.touched, field.name);
    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{props.label}<span>*</span></Form.Label>
                <Form.Control
                    as={props.type}
                    rows={props.rows}
                    name={props.name}
                    placeholder={props.placeholder ? props.placeholder : `Enter ${props.label}`}
                    {...field} {...props}
                ></Form.Control>
                {touch && error ? <span style={{ color: '#ff8080', 'marginTop': '5px', 'fontSize': '13px' }} className="error">{error}</span> : null}
            </Form.Group>

        </div >
    )
};


export default FieldInputTextarea;
