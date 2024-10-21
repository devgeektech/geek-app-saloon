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
import {useEffect} from 'react'

const SelectSaloonModal = (props: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saloonList, saloonId } = useSelector((state: any) => state.saloon);

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

    const closeModal =()=>{
        dispatch(setModalStatus(false))
        navigate('/dashboard');
    }

    useEffect(()=>{
        if((saloonList?.length > 0) && saloonId){
            console.log('saloonList',saloonList)
          let saloonValue = saloonList.filter((item:any)=> {return (item?._id == saloonId)});
          if(saloonValue){
            formik.setFieldValue('saloon', saloonValue[0]._id)
          }
        }
    },[saloonId])

    return (
        <>
            <Modal show={props?.show} onHide={() => dispatch(setModalStatus(false))} backdrop="static">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Modal.Header>
                            {saloonId && <Button variant="close" onClick={closeModal} />}
                            {/* <Modal.Title>Select Saloon</Modal.Title> */}
                        </Modal.Header>
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
                    </form>
                </FormikProvider>
            </Modal>
        </>
    );
};

export default SelectSaloonModal;
