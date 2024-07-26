import { Form } from 'react-bootstrap';
import { getIn } from 'formik';

const FieldSelectInput = ({ field, form, ...props }: any) => {

    const error = getIn(form.errors, field.name);
    const touch = getIn(form.touched, field.name);
    return (
        <div>
            <Form.Group className="mb-3" controlId={field.name}>
                <Form.Label>{props.label}<span>*</span></Form.Label>
                <Form.Select  {...field} {...props}
                    name={props.name}
                >
                    <option value=''>{props['label']}</option>
                    {typeof props.options == 'object' && props.options.length != 0 ? props.options.map((e: any, i: number) => {
                        return (
                            <option key={i} value={e.value ? e.value : e._id}>{e.label ? e.label : e.name}</option>
                        )
                    }) : <option value="">{props.options}</option>}

                </Form.Select>
                {touch && error ? <span style={{ color: '#ff8080', 'marginTop': '5px', 'fontSize': '13px' }} className="error">{error}</span> : null}
            </Form.Group>
        </div >
    )
};


export default FieldSelectInput;