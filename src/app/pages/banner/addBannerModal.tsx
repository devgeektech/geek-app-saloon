import { useState } from 'react';
import { Field, FormikProvider, useFormik, useFormikContext } from 'formik';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FieldInputText from '../../components/inputs/FieldInputText';
import FieldSelectInput from '../../components/inputs/FIeldSelectInput';
import FieldTextArea from '../../components/inputs/FieldTextArea';
import { commonFileUpload } from '../../services/_requests';
import placeholderImg from '../../../_metronic/assets/images/placeholderImg.jpg';

const BannerModal = (props:any) => {
  const {
    formik,
    show,
    schema,
    handleFileChange,
    type,
    cancelButton,
    file
  } = props;

  const serviceState = useSelector((state:any) => state.service);

  const errorMessage = typeof formik.errors.image === 'string' 
    ? formik.errors.image 
    : '';

    
 

  return (
    <Modal show={show}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Add Banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col sm={12}>
                  <Field
                    name="name"
                    validate={schema}
                    label="Caption"
                    component={FieldInputText}
                    placeholder="Image caption"
                  />
                </Col>
                <Col sm={12} className="mt-4">
                  <Field
                    as="select"
                    name="type"
                    validate={schema}
                    label="Type"
                    component={FieldSelectInput}
                    options={type.map(t => ({ label: t, value: t }))}
                    onChange={formik.handleChange}
                    value={formik.values.type}

                  />
                </Col>
                <Col sm={12} className="mt-4">
                  <label className="form-label">
                    <small>Upload Picture</small>
                  </label>
                  <input
                    type="file"
                    className={clsx(
                      'form-control bg-transparent',
                      { 'is-invalid': formik.touched.image && formik.errors.image },
                      { 'is-valid': formik.touched.image && !formik.errors.image }
                    )}
                    onChange={handleFileChange}
                  />
                  {formik.touched.image && errorMessage && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{errorMessage}</span>
                      </div>
                    </div>
                  )}
                </Col>
                {file && (
                  <Col sm={12} className="mt-4">
                    <img className="w-100 rounded-2" src={file} alt="UploadImage" />
                  </Col>
                )}
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

                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {!serviceState.loading && (
                  <span className="indicator-label">Save</span>
                )}
                {serviceState.loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default BannerModal;
