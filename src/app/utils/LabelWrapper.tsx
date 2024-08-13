import { Form } from "react-bootstrap";

interface LABEL {
  label: String;
  required: Boolean;
}
export const LableWrapper = (props: LABEL ) => {
  return (
    <Form.Label>
      {props.label}
      <span style={{ color: "#ff8080" }}>{`${props.required ? "*" : ""}`}</span>
    </Form.Label>
  );
};
