import { Field, FormikProvider } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import FieldInputText from '../../components/common/inputs/FieldInputText';
import FieldSelectInput from '../../components/common/inputs/FIeldSelectInput';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import { useEffect, useRef, useState } from 'react';
import { fetchLocationFromLatLng, getCroppedImg } from '../../utils/common';
import 'react-image-crop/src/ReactCrop.scss'

const SaloonModal = (props: any) => {
  const {
    formik,
    show,
    schema,
    cancelButton
  } = props;
  const [location, setLocation] = useState('');
  
  return (
    <Modal show={show} size='lg' onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>{formik.values._id ? 'Update' : 'Add'} Saloon</Modal.Title>
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
                <Col sm={12}>
                  <Field
                    name="name"
                    validate={schema}
                    label="Name"
                    component={FieldInputText}
                    placeholder="Saloon Name"
                  />
                </Col>
                {/* <Col sm={12}>
                  <Field
                    name="description"
                    validate={schema}
                    label="Description"
                    component={FieldInputText}
                    placeholder="Description"
                  />
                </Col> */}

                <Col sm={6}>
                  <Field
                    name='latitude'
                    label='Latitude'
                    component={FieldInputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('latitude', e.target.value);
                    }}
                  />
                </Col>
                <Col sm={6}>
                  <Field
                    name='longitude'
                    label='Longitude'
                    component={FieldInputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('longitude', e.target.value);
                    }}
                  />
                </Col>
                <Col sm={12}>
                  <Field
                    name='location'
                    label='Location'
                    component={FieldInputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('location', e.target.value);
                    }}
                  />
                </Col>
                <Col sm={12}>
                  <Field
                    type='number'
                    name='phone'
                    label='Phone'
                    component={FieldInputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue('phone', e.target.value);
                    }}
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
                disabled={formik.isSubmitting && formik.isValid}
              >
                <span className="indicator-label">{formik.values._id ? 'Update' : 'Add'}</span>
              </button>
            </div>
          </Modal.Footer>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default SaloonModal;
