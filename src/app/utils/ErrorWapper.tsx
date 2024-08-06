
interface ERROR {
  error: String;
}
export const ErrorWrapper = (props: ERROR) => {
  return (
    <span
      style={{ color: "#ff8080", marginTop: "5px", fontSize: "13px" }}
      className="error"
    >
      {props.error}
    </span>
  );
};
