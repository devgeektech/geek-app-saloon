import { Form } from "react-bootstrap";
import { getIn } from "formik";
import { LableWrapper } from "../../../utils/LabelWrapper";
import { ErrorWrapper } from "../../../utils/ErrorWapper";

const FieldTextArea = ({ field, form, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <LableWrapper label={props.label} required={props.required} />

        <Form.Control
          name={props.name}
          as="textarea" 
          rows={3}
          placeholder={
            props.placeholder ? props.placeholder : `Enter ${props.label}`
          }
          {...field}
          {...props}
        ></Form.Control>
                {touch && error ? <ErrorWrapper error={error} /> : null}

      </Form.Group>
    </div>
  );
};

export default FieldTextArea;
