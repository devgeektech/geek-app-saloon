import { Field, FormikProvider } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FieldInputText from '../../components/common/inputs/FieldInputText';
import FieldSelectInput from '../../components/common/inputs/FIeldSelectInput';
import 'react-image-crop/src/ReactCrop.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { useEffect, useState } from 'react';
import { fetchListRequest } from '../../redux/actions/serviceAction';
import { MultiSelect } from 'react-multi-select-component';
import DatePickerInput from '../../components/common/inputs/datePickerInput';
import { setSelectedSaloon } from '../../redux/reducer/saloonSlice';

const CouponModal = (props: any) => {
  const {
    formik,
    show,
    schema,
    categories,
    cancelButton,
  } = props;
  const { couponId } = useSelector((state: any) => state.coupon);
  const serviceList = useSelector((state: any) => state.saloonService?.data?.data)
  const { serviceMultipSelectArr } = useSelector((state: any) => state.service)
  const { saloonList, saloonSelectArr, selectedSaloonArr } = useSelector((state: any) => state.saloon)
  const [subCategories, setSubcategories] = useState([]);
  const [disablesubCategory, setDisablesubCategory] = useState(true);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    dispatch(fetchListRequest(0, 0, ''));
    if (couponId) {
      setSelectedSubCategories(formik.values?.category);
    }
  }, [])

  const handleChange = (selectedOptions) => {
    dispatch(setSelectedSaloon(selectedOptions));
    const valuesArray = selectedOptions.map(option => option.value);
    formik.setFieldValue("saloon", valuesArray);
  };

  const setSelectedSubCategories = (cid: string) => {
    let index = categories.findIndex(
      (item: any) => cid === item._id
    );
    if (index > -1) {
      setSubcategories(categories[index].subCategory);
      setDisablesubCategory(false);
    }
  }

  return (
    <Modal show={show} size='lg' onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>{couponId ? 'Update' : 'Add'} Coupon</Modal.Title>
            <button type='button' className='bg-transparent border-0' onClick={cancelButton}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
              >
                <path
                  d='M7.9193 9.49993L0.327318 17.0919C-0.109199 17.5285 -0.109013 18.2361 0.327318 18.6726C0.763836 19.1091 1.47148 19.1091 1.90798 18.6726L9.49997 11.0806L17.092 18.6726C17.5285 19.1091 18.2361 19.1091 18.6726 18.6726C19.1091 18.2361 19.1091 17.5284 18.6726 17.0919L11.0806 9.49993L18.6726 1.90792C19.1089 1.4714 19.1089 0.763754 18.6726 0.32725C18.2361 -0.109081 17.5285 -0.109081 17.092 0.32725L9.49997 7.91926L1.90798 0.32725C1.47147 -0.109081 0.763821 -0.109081 0.327318 0.32725C-0.109013 0.763769 -0.109013 1.47142 0.327318 1.90792L7.9193 9.49993Z'
                  fill='#778CA2'
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col sm={6}>
                  <Field
                    name="offerName"
                    validate={schema}
                    label="Offer Name"
                    component={FieldInputText}
                    placeholder="Enter Offer Name"
                  />
                </Col>
                <Col sm={6}>
                  <label className='form-label'>Saloon</label><br />
                  <MultiSelect
                    options={saloonSelectArr}
                    value={selectedSaloonArr || formik?.values?.saloon}
                    onChange={handleChange}
                    labelledBy={"Select"}
                    isCreatable={true}
                  />
                  {formik.errors.saloon && (
                    <div style={{ color: 'red' }}>{formik.errors.saloon}</div>
                  )}
                </Col>

                <Col sm={6}>
                  <Field
                    as="select"
                    name="service"
                    validate={schema}
                    label="Service"
                    component={FieldSelectInput}
                    options={serviceMultipSelectArr}
                    onChange={formik.handleChange}
                    value={formik.values.service}
                    disabled={(selectedSaloonArr?.length > 0) ? false : true}
                  />
                </Col>

                <Col sm={6}>
                  <Field
                    name="discount"
                    validate={schema}
                    label="Discount %"
                    type="number"
                    component={FieldInputText}
                    placeholder="Enter discount"
                  />
                </Col>

                <Col sm={6} className="mt-4">
                  <label className='form-label'>Offer Start</label><br />
                  <Field
                    className='form-select'
                    name="offerStart"
                    validate={schema}
                    component={DatePickerInput}
                    placeholderText="Select a start date"
                  />
                </Col>

                <Col sm={6} className="mt-4">
                  <label className='form-label'>Offer Closed</label><br />
                  <Field
                    className='form-select'
                    name="offerClose"
                    component={DatePickerInput}
                    placeholderText="Select an end date"
                  />
                </Col>

                <Col sm={6} className="mt-4">
                  <Field
                    as="select"
                    name="status"
                    validate={schema}
                    label="Status"
                    component={FieldSelectInput}
                    options={['Active', 'InActive'].map(t => ({ label: t, value: t }))}
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  />
                </Col>

              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-items-center gap-5">
              <Button
                type="button"
                className="borderBtn btn-sm w-200"
                onClick={cancelButton}
              >
                Cancel
              </Button>
              <button
                className="blackBtn btn-sm w-150"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                <span className="indicator-label">Save</span>
              </button>
            </div>
          </Modal.Footer>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default CouponModal;
