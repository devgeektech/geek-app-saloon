import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import { Col, Dropdown, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import { REQUIRED } from '../../utils/const';
import { toast } from "react-toastify";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointmentSuccess, setAppointmentId, updateAppointmentSuccess } from '../../redux/reducer/appointmentSlice'
import { addAppointment, updateAppointment } from '../../services/_requests'
import AppointmentModal from './appointmentModal'
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import Calendar from 'react-calendar'
import { REQUIRED_FIELD } from '../../utils/ErrorMessages'

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

const AvailabilityAppointment = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { appointmentList, totalRecord, loading, appointmentId } = useSelector((state: any) => state.appointment);
  const { saloonId } = useSelector((state: any) => state.saloon);
  const [editMode, setEditMode] = useState<boolean>(false);
  const initialValues = {
    name: '',
    gender: '',
    age: '',
    aboutUs: '',
    qualification: '',
  }
  const [value, onChange] = useState<any>(new Date());
  const appointmentSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    gender: Yup.string().required(REQUIRED_FIELD),
    age: Yup.string().required(REQUIRED_FIELD),
    aboutUs: Yup.string().required(REQUIRED_FIELD),
    qualification: Yup.string().required(REQUIRED_FIELD),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: appointmentSchema,
    // enableReinitialize: true, // important to reset form values when 'initialValues' change
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (!saloonId) {
          return toast.info("Select Saloon First!")
        }

        const data = { ...values, saloonId };
        if (editMode) {
          let res = await updateAppointment(appointmentId, data);
          if (res.status === 200) {
            dispatch(updateAppointmentSuccess(res.data));
          }
        } else {
          let res = await addAppointment(data);
          dispatch(addAppointmentSuccess(res.data));
        }
        closeAppointmentModal();
        setEditMode(false)
      } catch (error: any) {
        console.error(error);
        toast.error(error.responseMessage || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });
  const editAppointment = (item: any) => {
    console.log(item)
    setEditMode(true);
    dispatch(setAppointmentId(item?._id));
    setModalShow(true);
    formik.setValues(item);
  };

  const closeAppointmentModal = () => {
    setModalShow(false);
    formik.resetForm();
  };
  const events = [
    { title: 'Meeting', start: new Date() }
  ]
  return (
    <>
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={appointmentBlackIcon} alt='appointmentBlackIcon' />
              <Link to={'/appointment'} className=''>
                <h2> Appointments & Rescheduling &gt;&gt; Availability </h2>
              </Link>
            </h2>
            <p>Empowers you to manage appointments efficiently</p>
          </div>
        </div>
        <div className='tabWrapper'>
          <Tabs defaultActiveKey='week' id='uncontrolled-tab-example'>
            <Tab eventKey='week' title='Week'>
              <div className='tableWrapper my-5'>
                <FullCalendar
                  plugins={[timeGridPlugin]}
                  initialView='timeGridWeek'
                  weekends={false}
                  weekNumbers={false}
                  events={events}
                  headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                  }}
                  showNonCurrentDates={true}
                  allDayMaintainDuration={true}
                  eventContent={renderEventContent}
                />
              </div>
            </Tab>
            <Tab eventKey='day' title='Day'>
              <Row>
                <Col sm={9}>
                  <div className='tableWrapper my-5'>
                    <Table responsive className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>Spot no</th>
                          <th>Time</th>
                          <th>Appointment ID</th>
                          <th>Customer Name</th>
                          <th>Service (Category)</th>
                          <th>Sub-Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>001</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>002</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>003</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>

                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>004</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>005</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>006</td>
                          <td>12:30 PM</td>
                          <td>53434343</td>
                          <td>Joe Doe</td>
                          <td>Hair, Massage</td>
                          <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                          <td>
                            <div className='d-flex'>
                              <button className='editBtn'>
                                <img src={pencilEditIcon} alt='pencilEditIcon' />
                              </button>
                              <button className='deleteBtn'>
                                <img src={deleteIcon} alt='deleteIcon' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col sm={3} className='position-relative'>
                  <div className='mt-5 rounded'>
                    <Calendar onChange={onChange} value={value} />
                  </div>
                  <div className='position-absolute bottom-0 w-100 mb-5'>
                    <button
                      className="blackBtn btn-sm w-100 py-2"
                    >
                      <span className="indicator-label">Save Changes</span>
                    </button>
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
      {modalShow && (
        <AppointmentModal
          show={modalShow}
          schema={appointmentSchema}
          formik={formik}
          cancelButton={closeAppointmentModal}
          gender={["Male", "Female", "Other"]}
        />
      )}
    </>
  )
}

export { AvailabilityAppointment }
