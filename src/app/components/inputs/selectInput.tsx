import { Form } from 'react-bootstrap';

export default function SelectField(props: any) {
    return (
        <>
            <Form.Group className={props.class} controlId="exampleForm.ControlInput1">
                <Form.Label>{props.label}<span>*</span></Form.Label>
                <Form.Select
                    name={props.name}
                    aria-label="Contract Period"
                >
                    <option value=''>{props.selectLabel}</option>
                    {typeof props.options == 'object' && props.options.length != 0 ? props.options.map((e: any, i: number) => {
                        return (
                            <option key={i} value={e}>{e}</option>
                        )
                    }) : <option value="">{props.options }</option>}

                </Form.Select>

            </Form.Group>
        </>
    )
}