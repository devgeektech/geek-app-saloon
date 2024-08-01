import { Form } from "react-bootstrap";
import { getIn } from "formik";
import { LableWrapper } from "../../utils/LabelWrapper";
import { ErrorWrapper } from "../../utils/ErrorWapper";

const FieldSelectInput = ({ field, form, ...props }: any) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);

  return (
    <div>
      <Form.Group className="mb-3" controlId={field.name}>
        <LableWrapper label={props.label} required={props.required} />

        <Form.Select
          name={props.name}
          onChange={props.handleCategoryChange}
          disabled={props.disabled}
        >
          <option value="">{props["label"]}</option>
          {props.options.length != 0 ? (
            props.options.map((e: any, i: number) => {
              return (
                <option key={i} value={e.value ? e.value : e._id}>
                  {e.label ? e.label : e.name}
                </option>
              );
            })
          ) : (
            <option disabled value="">
              No result found.
            </option>
          )}
        </Form.Select>
        {touch && error ? <ErrorWrapper error={error} /> : null}
      </Form.Group>
    </div>
  );
};

export default FieldSelectInput;
