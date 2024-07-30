import { Form } from "react-bootstrap";
import { getIn } from "formik";
import { LableWrapper } from "../../utils/LabelWrapper";

const FieldInputText = ({ field, form, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <LableWrapper label={props.label} required={props.required} />

        <Form.Control
          name={props.name}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : `${props.label}`}
          {...field}
          {...props}
        ></Form.Control>
        {touch && error ? (
          <span
            style={{ color: "#ff8080", marginTop: "5px", fontSize: "13px" }}
            className="error"
          >
            {error}
          </span>
        ) : null}
      </Form.Group>
    </div>
  );
};

export default FieldInputText;
