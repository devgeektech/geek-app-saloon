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
import 'react-image-crop/dist/ReactCrop.css';
import dummyImg from "../../../_metronic/images/dummy.webp";
import FieldTextArea from '../../components/common/inputs/FieldTextArea';
import locationIcon from '../../../_metronic/images/location.svg'
const AppointmentModal = (props: any) => {
  const {
    formik,
    show,
    schema,
    gender,
    cancelButton,
  } = props;
  const { appointmentId } = useSelector((state: any) => state.appointment);
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


  useEffect(() => {
    setPreviewUrl('');
  }, [show]);

  return (
    <Modal show={show} size='lg' className='appointment-modal' onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Appointment ID: #545151511451</Modal.Title>
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
          <Row>
          <Col sm={6}>
            <div className='px-2' style={{borderRight:'1px solid #ccc'}}>
              <Row>
                <Col sm={12}>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Customer Name:</div>
                      <div>
                        <img
                          className="profileImg"
                          src={dummyImg}
                          alt=""
                        />
                        <span> Joe Doe </span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Date</div>
                      <div>
                        <span className='fw-bold'>Tue,Sept 4,2023</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Status:</div>
                      <div>
                        <span className='text-success'>Complete</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Payment:</div>
                      <div></div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Payment Method:</div>
                      <div></div>
                  </div>

                  
                </Col>
              </Row>
              
            </div>
            </Col>
            <Col sm={6}>
            <div className=''>
              <Row>
                <Col sm={12}>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Saloon Name:</div>
                      <div>
                        <span className='fw-bold'>SS HAir</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Time</div>
                      <div>
                        <span className='fw-bold'>11:30 AM</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Status:</div>
                      <div>
                        <span className='text-success'>Complete</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Service(Category):</div>
                      <div>
                        <span className='fw-bold'>Hair</span>
                      </div>
                  </div>
                  <div className='d-flex justify-content-between mb-5'>
                      <div>Service:</div>
                      <div>
                        <span className='fw-bold'>Hair</span>
                      </div>
                  </div>
                </Col>
              </Row>
            </div>
            
            </Col>
            </Row>
            <Row className='my-5'>
                <Col sm={6}>
                   <div>
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d145804.82506705448!2d106.7370623094913!3d47.891532186378925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96925be2b18aab%3A0xe606927864a1847f!2sUlaanbaatar%2C%20Mongolia!5e1!3m2!1sen!2sin!4v1726082069605!5m2!1sen!2sin" width="350" height="160" style={{border:0,borderRadius:10}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                </Col>
                <Col sm={6}>
                   <div className='d-flex flex-column justify-content-center h-100'>
                    <h4>Cleaned Saloon</h4>
                    <p>anywhere street, anywhere city, anycountry</p>
                    <img width={56} height={60} src={locationIcon} alt='location' />
                  </div>
                  </Col>
              </Row>
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

export default AppointmentModal;
