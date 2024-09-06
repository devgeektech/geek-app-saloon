import { Field, FormikProvider } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import FieldInputText from '../../components/common/inputs/FieldInputText';
import FieldSelectInput from '../../components/common/inputs/FIeldSelectInput';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import { useEffect, useRef, useState } from 'react';
import { getCroppedImg } from '../../utils/common';
import 'react-image-crop/src/ReactCrop.scss'
import 'react-image-crop/dist/ReactCrop.css'
import FieldTextArea from '../../components/common/inputs/FieldTextArea';

const StaffModal = (props: any) => {
  const {
    formik,
    show,
    schema,
    handleFileChange,
    gender,
    cancelButton,
  } = props;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>()
  const [previewUrl, setPreviewUrl] = useState('');

  const errorMessage = typeof formik.errors.image === 'string'
    ? formik.errors.image
    : '';

  function onImageLoad(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        16 / 16,
        width,
        height
      ),
      width,
      height
    )
    setCrop(crop);
  }

  const handleFile = async (event: any) => {
    let file = event?.target?.files[0];
    let url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  const handleCropComplete = async (crop: any) => {
    const blobImg: any = await getCroppedImg(imgRef.current, crop, 'thumbnail.jpeg');
    handleFileChange(blobImg);
  };

  useEffect(() => {
    setPreviewUrl('');
  }, [show]);

  return (
    <Modal show={show} size='lg' onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Add Staff</Modal.Title>
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
                    name="name"
                    required={true}
                    validate={schema}
                    label="Name"
                    component={FieldInputText}
                    placeholder="Enter Name"
                  />
                </Col>
                <Col sm={6}>
                  <Field
                    name="age"
                    required={true}
                    validate={schema}
                    label="Age"
                    type="number"
                    component={FieldInputText}
                    placeholder="Enter Age"
                  />
                </Col>
                <Col sm={12}>
                  <Field
                    name="qualification"
                    validate={schema}
                    required={true}
                    label="Qualification"
                    component={FieldInputText}
                    placeholder="Enter Qualification"
                  />
                 
                </Col>
                <Col sm={12} >
                 
                 <Field
                   name="aboutUs"
                   required={true}
                   label="About Us"
              
                   component={FieldTextArea}
                 />
              
             </Col> 
                <Col sm={6} className="mt-4">
                  <Field
                    as="select"
                    name="gender"
                    validate={schema}
                    label="Gender"
                    component={FieldSelectInput}
                    options={gender.map(t => ({ label: t, value: t }))}
                    onChange={formik.handleChange}
                    value={formik.values.type}

                  />
                </Col>
             
                <Col sm={6} className="mt-4">
                  <label className="form-label">
                    <small>Upload Picture</small>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className={clsx(
                      'form-control bg-transparent mb-3',
                      { 'is-invalid': formik.touched.image && formik.errors.image },
                      { 'is-valid': formik.touched.image && !formik.errors.image }
                    )}
                    onChange={handleFile}
                  />

                  <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(crop) => handleCropComplete(crop)} aspect={16 / 16} keepSelection={true} minWidth={206}
                    minHeight={206}>
                    <img ref={imgRef} src={previewUrl} onLoad={onImageLoad} alt='' />
                  </ReactCrop>

                  {formik.touched.image && errorMessage && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert">{errorMessage}</span>
                      </div>
                    </div>
                  )}
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

export default StaffModal;
