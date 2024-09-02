import { Form } from "react-bootstrap";
import { getIn } from "formik";
import { LableWrapper } from "../../../utils/LabelWrapper";
import { ErrorWrapper } from "../../../utils/ErrorWapper";

const FieldCheckBox = ({ field, form, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <div>
      <Form.Group className="mb-3">
        <LableWrapper label={props.label} required={props.required} />
        {props.options.map((tag: any) => (
          <div key={tag}>
            <Form.Check
              inline
              label={tag}
              name={props.name}
              type="checkbox"
              id={tag}
              checked={form.values.gender.includes(
                tag as never
              )}
              onChange={(e) => props.handleChange(e)}
            />
          </div>
        ))}
        {touch && error ? <ErrorWrapper error={error} /> : null}
      </Form.Group>
    </div>
  );
};

export default FieldCheckBox;
