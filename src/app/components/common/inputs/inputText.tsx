import { Form } from 'react-bootstrap';

export default function InputTextField(props: any) {
    return (
        <>
            <Form.Group className={props.class} controlId="exampleForm.ControlInput1">
                <Form.Label>{props.label}<span>*</span></Form.Label>
                <Form.Control
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder ? props.placeholder : `Enter ${props.label}`} ></Form.Control>
            </Form.Group>
        </>
    )
}