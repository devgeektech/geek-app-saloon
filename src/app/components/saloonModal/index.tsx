import { Button, Modal } from 'react-bootstrap';
import 'react-image-crop/src/ReactCrop.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux';
import { setModalStatus, setRequestStatus } from '../../redux/reducer/helperSlice';
import * as Yup from "yup";
import { FormikProvider, useFormik, Field } from 'formik';
import { ADD, INVALID_PHONE_NUMBER, PHONE_REGEX, REQUIRED } from '../../utils/const';
import FieldSelectInput from '../common/inputs/FIeldSelectInput';
import { addSaloonRequest, getSaloonRequest, setSaloonId, setSaloonModal, setSaloonName } from '../../redux/reducer/saloonSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import SaloonModal from '../../pages/vendors/addSaloonModal';
import { REQUIRED_FIELD } from '../../utils/ErrorMessages';

const SelectSaloonModal = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saloonList, saloonId, skip, limit, lat, lng, saloonModal } = useSelector((state: any) => state.saloon);
    const modalType = ADD
    const { requestStatus } = useSelector(
        (state: any) => state.helper
    );

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

    const closeModal = () => {
        dispatch(setModalStatus(false))
        navigate('/dashboard');
    }

    const saloonInitialValues = {
        name: "",
        image: "",
        location: "",
        latitude: "",
        longitude: "",
        phone: "",
    };

    const serviceSchema = Yup.object().shape({
        name: Yup.string().required(REQUIRED_FIELD),
        location: Yup.string().required(REQUIRED_FIELD),
        latitude: Yup.number().required(REQUIRED_FIELD),
        longitude: Yup.number().required(REQUIRED_FIELD),
        phone: Yup.string()
            .matches(PHONE_REGEX, INVALID_PHONE_NUMBER)
            .required(REQUIRED_FIELD),
    });

    const saloonFormik = useFormik({
        initialValues: saloonInitialValues,
        validationSchema: serviceSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                let reqObj: any = {
                    name: values?.name,
                    loc: {
                        type: "Point",
                        coordinates: [values.latitude, values?.longitude],
                    },
                    address: {
                        city: values?.location,
                    },
                    phone: values?.phone,
                };
                dispatch(addSaloonRequest(reqObj));
                dispatch(setRequestStatus(false))
                formik.resetForm();
            } catch (error: any) {
                setStatus(error.message);
                setSubmitting(false);
            }
        },
    });

    const openSaloonModal = async () => {
        dispatch(setSaloonModal(true))
    };

    const cancelButton = () => {
        dispatch(setSaloonModal(false));
        formik.resetForm();
    };

    useEffect(() => {
        if ((saloonList?.length > 0) && saloonId) {
            let saloonValue = saloonList.filter((item: any) => { return (item?._id == saloonId) });
            if (saloonValue) {
                formik.setFieldValue('saloon', saloonValue[0]._id)
            }
        }
    }, [saloonId])

    useEffect(() => {
        if (requestStatus) {
            dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser: '' }));
        }
    }, [requestStatus])

    return (
        <>
            <Modal show={props?.show} onHide={() => dispatch(setModalStatus(false))} backdrop="static">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Header>
                            {saloonId && <Button variant="close" onClick={closeModal} />}
                            {/* <Modal.Title>Select Saloon</Modal.Title> */}
                        </Modal.Header>

                        {(saloonList?.length > 0) ? (
                            <>
                                <Modal.Body>
                                    <Field
                                        as="select"
                                        name="saloon"
                                        validate={validationSchema}
                                        label="Saloon"
                                        component={FieldSelectInput}
                                        options={saloonList}
                                        onChange={formik.handleChange}
                                        value={formik.values.saloon}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" type="submit">
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </>
                        ) : (
                            <>
                                <Modal.Body>
                                    <h5>No data found</h5>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={openSaloonModal}>
                                        Add Saloon
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </form>
                </FormikProvider>
            </Modal>

            {saloonModal && (
                <SaloonModal
                    show={saloonModal}
                    schema={serviceSchema}
                    formik={saloonFormik}
                    cancelButton={cancelButton}
                    modalType={modalType}
                ></SaloonModal>
            )}
        </>
    );
};

export default SelectSaloonModal;
