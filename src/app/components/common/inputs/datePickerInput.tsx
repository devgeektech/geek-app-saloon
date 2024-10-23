// DatePickerInput.js
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getIn } from "formik";
import { ErrorWrapper } from '../../../utils/ErrorWapper';

const DatePickerInput = ({ field, form, ...props }) => {
    const error = getIn(form.errors, field.name);
    const touch = getIn(form.touched, field.name);
    const onChange = (fieldName:any,date:any)=>{
        let updatedDate = new Date(date).toISOString();
        form.setFieldValue(fieldName, updatedDate)
    }
    return (
        <>
        <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={date => onChange(field.name, date)}
            {...props}
        />
        {touch && error ? <ErrorWrapper error={error} /> : null}
        </>
    );
};

export default DatePickerInput;
