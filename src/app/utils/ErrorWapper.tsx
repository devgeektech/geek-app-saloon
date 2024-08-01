import { Form } from "react-bootstrap";

interface ERROR {
  error: String;
}
export const ErrorWrapper = (props: ERROR) => {
  debugger;
  console.log(props);
  return (
    <span
      style={{ color: "#ff8080", marginTop: "5px", fontSize: "13px" }}
      className="error"
    >
      {props.error}
    </span>
  );
};
