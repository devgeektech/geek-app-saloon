import { Button, Modal } from 'react-bootstrap';
import 'react-image-crop/src/ReactCrop.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus } from '../../redux/reducer/helperSlice';
import * as Yup from "yup";
import { FormikProvider, useFormik, Field } from 'formik';
import { REQUIRED } from '../../utils/const';
import FieldSelectInput from '../common/inputs/FIeldSelectInput';
import { setSaloonId } from '../../redux/reducer/saloonSlice';
import { useNavigate } from 'react-router-dom';

const SelectSaloonModal = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saloonList } = useSelector((state: any) => state.saloon);

    const initialValues = {
        saloon: '',
    }

    const validationSchema = Yup.object().shape({
        saloon: Yup.string().required(REQUIRED),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            dispatch(setSaloonId(values?.saloon))
            dispatch(setModalStatus(false))
            navigate('/dashboard');
        },
    });

    return (
        <>
            <Modal show={props?.show} onHide={() => dispatch(setModalStatus(false))} backdrop="static">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Header>
                            {/* <Modal.Title>Select Saloon</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body>
                            <Field
                                as="select"
                                name="saloon"
                                validate={validationSchema}
                                label="Select Saloon"
                                component={FieldSelectInput}
                                options={saloonList}
                                onChange={formik.handleChange}
                                value={formik.values.saloon}
                            />

                        </Modal.Body>
                        <Modal.Footer>
                            {/* <Button variant="secondary" onClick={() => dispatch(setModalStatus(false))}>
                                Close
                            </Button> */}
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </FormikProvider>
            </Modal>
        </>
    );
};

export default SelectSaloonModal;
