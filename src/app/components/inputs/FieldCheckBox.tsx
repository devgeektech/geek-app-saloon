import { Form } from "react-bootstrap";
import { getIn } from "formik";

const FieldCheckBox = ({ field, form, ...props }: any) => {
  debugger;
  console.log(props);
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>
          {props.label}
          <span>*</span>
        </Form.Label>
        {props.options.map((tag: any) => (
          <div key={tag}>
            <Form.Check
              inline
              label={tag}
              name={props.gender}
              type="checkbox"
              id={`inline-checkbox-1`}
            
            />
            {/* <input
                            {...formik.getFieldProps("gender")}
                            id={tag}
                            type="checkbox"
                            name={tag}
                            checked={formik.values.gender.includes(
                              tag as never
                            )}
                            onChange={handleChange}
                          /> */}
          </div>
        ))}
        {/* <Form.Control
          name={props.name}
          type={props.type}
          placeholder={props.placeholder ? props.placeholder : `${props.label}`}
          {...field}
          {...props}
        ></Form.Control> */}
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
