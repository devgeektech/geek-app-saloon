import { Field, FormikProvider } from 'formik';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import FieldInputText from '../../components/inputs/FieldInputText';
import FieldSelectInput from '../../components/inputs/FIeldSelectInput';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import { useEffect, useRef, useState } from 'react';
import { getCroppedImg } from '../../utils/common';
import 'react-image-crop/src/ReactCrop.scss'

const BannerModal = (props: any) => {
  const {
    formik,
    show,
    schema,
    handleFileChange,
    type,
    cancelButton,
    file
  } = props;
  
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>()
  const serviceState = useSelector((state: any) => state.service);
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
        16/9,
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
    console.log("url", url);
    setPreviewUrl(url);
  }

  const handleCropComplete = async (crop: any) => {
    const blobImg: any = await getCroppedImg(imgRef.current, crop, 'thumbnail.jpeg');
    // const blobFile = blobToFile(blobImg, "bannerimage.jpeg");
    handleFileChange(blobImg);
  };

  // const blobToFile = (blob: Blob, name: string): File => {
  //   return new File([blob], name, {
  //     type: blob.type,
  //     lastModified: Date.now()
  //   });
  // };

  useEffect(() => {
    setPreviewUrl('');
    // setCrop(defaultCrop);
  }, [show]);
  
  return (
    <Modal show={show} size='lg'>
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
                    accept="image/*"
                    className={clsx(
                      'form-control bg-transparent mb-3',
                      { 'is-invalid': formik.touched.image && formik.errors.image },
                      { 'is-valid': formik.touched.image && !formik.errors.image }
                    )}
                    onChange={handleFile}
                  />

                  <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(crop) => handleCropComplete(crop)} aspect={16/9} keepSelection={true} minWidth={375}
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
                <span className="indicator-label">Save</span>
                {/* {!serviceState.loading && (
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
                )} */}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default BannerModal;
