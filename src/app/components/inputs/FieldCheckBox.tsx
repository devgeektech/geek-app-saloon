import { Form } from "react-bootstrap";
import { getIn } from "formik";
import { LableWrapper } from "../../utils/LabelWrapper";

const FieldCheckBox = ({ field, form, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <div>
      <Form.Group className="mb-3" >
        <LableWrapper label={props.label} required={props.required} />
        {props.options.map((tag: any) => (
          <div key={tag}>
            <Form.Check
              inline
              label={tag}
              name={props.name}
              type="checkbox"
              id={tag}
              // checked={formik.values.gender.includes(
              //   tag as never
              // )}
              onChange={(e) => props.handleChange(e)}
            />
          </div>
        ))}

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

export default FieldCheckBox;
