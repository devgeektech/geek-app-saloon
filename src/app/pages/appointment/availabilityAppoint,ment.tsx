import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import { Button, Col, Container, Dropdown, Form, Row, Tab, Table, Tabs } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import { REQUIRED } from '../../utils/const';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointmentSuccess, getAdminAppointmentSlots, getAppointentAvailabilityRequest, getAppointmentRequest, setAppointmentId, updateAdminAppointmentSlotsRequest, updateAppointmentSuccess } from '../../redux/reducer/appointmentSlice'
import { addAppointment, deleteAppointmentApi, updateAppointment } from '../../services/_requests'
import AppointmentModal from './appointmentModal'
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import Calendar from 'react-calendar'
import { REQUIRED_FIELD } from '../../utils/ErrorMessages'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit } from 'react-icons/fa';
import moment from 'moment'
import ShareModal from '../../components/common/modal/ShareModal'
import { AnyAaaaRecord } from 'dns'


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
  const [availableAppointments, setAvailableAppointments] = useState<any>([]);
  const [fullcalendar, setFullCalendar] = useState<any>({start: '', end: ''});
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { appointmentList, totalRecord, loading, appointmentId, adminSlotsList, appointmnetAvailability } = useSelector((state: any) => state.appointment);
  const { saloonId } = useSelector((state: any) => state.saloon);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [dateState , setDateState] = useState({
    date: new Date()
  })
  const [deleteModalShow, setDeleteModal] = useState<boolean>(false);
  const [TimeState, setTimeState] = useState('');
  const deleteCloseModal = () => {
    setDeleteModal(false);
  };
  const [selectedSlot, setSelectedSlot] = useState({});
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

  const handleChangeDate = (date, event) => {
    setDateState({ date: new Date(date) });
  };

  const handleChangeTime = (e) => {
    const intValue = e.target.value;
    // Only update if the value is empty or a valid integer
    if (intValue === '' || /^[0-9]+$/.test(intValue)) {
      setTimeState(intValue);
    }
  };

  const closeAppointmentModal = () => {
    setModalShow(false);
    formik.resetForm();
  };

  const onEdit = (slot:any)=>{
    if(TimeState == '' || !dateState.date) {
      return toast.info("Select Date & Time First!")
    }
    let obj= {
      startSlot: slot.start,
      date : moment(dateState.date).format("YYYY-MM-DD"),
      amount: 0,
      isBookedByAdmin: true,
      serviceTime: TimeState
    }
    setSelectedSlot(obj)
    setDeleteModal(true)
  }

  const formatDateToISO = (date:any) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC
    return d.toISOString();
  }

  const getAdminAppointments = () => {
    if(TimeState == '' || !dateState.date) {
      return toast.info("Select Date & Time First!")
    }
    let obj = {date : moment(dateState.date).format("YYYY-MM-DD"), data:{ isBookedByAdmin: true, serviceTime:TimeState} }
    dispatch(getAdminAppointmentSlots(obj))
  };

  // const events = [
  //   { title: 'Meeting', start: '2024-10-24T07:30:00', end: '2024-10-24T08:00:00', allDay: false },
  //   { title: 'event 1', start: '2024-10-25T05:30:00', end: '2024-10-25T09:00:00', allDay: false }
  // ]

  useEffect(() => {
    console.log("Use effect works >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    let obj:any = { start:fullcalendar.start, end: fullcalendar.end }
    dispatch(getAppointentAvailabilityRequest(obj));
    let array:any = []
    // console.log(appointmnetAvailability,">>>>> appointment availability >>>>>>")
    if(appointmnetAvailability && appointmnetAvailability.length > 0) {
      appointmnetAvailability.forEach((item:any)=>{
          array.push({...item,
          title: item?.serviceDetails,
          start : item?.calenderStart,
          end : item?.calenderEnd })
      })
    }

    console.log(array,">>> array::::")
    setAvailableAppointments(array);
    // console.log('available fixes', availableAppointments)
  }, [fullcalendar])

  return (
    <>
      <div className="appointmentContent">
        <div className="title_text d-flex justify-content-between align-items-center">
          <div className="">
            <h2 className="page_title">
              <img src={appointmentBlackIcon} alt="appointmentBlackIcon" />
              <Link to={"/appointment"} className="">
                <h2> Appointments & Rescheduling &gt;&gt; Availability </h2>
              </Link>
            </h2>
            <p>Empowers you to manage appointments efficiently</p>
          </div>
        </div>
        <div className="tabWrapper">
          <Tabs defaultActiveKey="week" id="uncontrolled-tab-example">
            <Tab eventKey="week" title="Week">
              <div className="tableWrapper my-5">
                <FullCalendar
                  plugins={[timeGridPlugin]}
                  initialView="timeGridWeek"
                  weekends={false}
                  weekNumbers={false}
                  events={availableAppointments}
                  headerToolbar={{
                    left: "title",
                    center: "",
                    right: "prev,next",
                  }}
                  showNonCurrentDates={true}
                  allDayMaintainDuration={true}
                  eventContent={renderEventContent}
                  slotDuration="00:30:00" // 30-minute intervals
                  // viewDidMount={(viewInfo) => {
                  //   console.log("View mounted:", viewInfo.view.type);
                  //   // Optionally fetch data for initial view here
                  // }}
                  datesSet={(dateInfo) => {
                    // console.log("View range changed:", formatDateToISO(dateInfo.startStr), "to", formatDateToISO(dateInfo.endStr));
                    setFullCalendar({start:formatDateToISO(dateInfo.startStr), end:formatDateToISO(dateInfo.endStr) })
                    // Perform any necessary operation, like fetching data based on new date range
                  }}
                />
              </div>
            </Tab>
            <Tab eventKey="adminBooking" title="Admin Booking">
              <Container>
                <Row className="mt-5">
                  <Col sm={3} className="mb-3">
                    <Form.Group controlId="date">
                      <Form.Label>Select Date</Form.Label>
                      <DatePicker
                        className='form-control'
                        selected={dateState.date}
                        onChange={handleChangeDate}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group controlId="Time">
                      <Form.Label>Select Time In Minutes</Form.Label>
                      <Form.Control
                        type="text"
                        value={TimeState}
                        onChange={handleChangeTime}
                        placeholder="Enter an integer"
                        className="form-control-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button className='mt-6' variant="primary"  onClick={(e) => {
                  e.preventDefault()
                  getAdminAppointments()
                }}> Submit </Button>
                  </Col>
                </Row>
                <Row>
                  {adminSlotsList && adminSlotsList.length > 0 && adminSlotsList.map((slot:any, index:number) => (
                    <Col key={index} xs={4} md={2} className="mb-3">
                      <div
                        className={`time-slot ${
                          slot.status === "available" ? "available" : ""
                        } ${
                          slot.status.includes("cancelled") ? "cancelled" : ""
                        }`}
                      >
                        <div className="time-header d-flex justify-content-between">
                          <span>{slot.start}</span>
                          <FaEdit className="edit-icon" onClick={(e)=>onEdit(slot)}/>
                        </div>
                        <div className="status">{slot.status}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </div>
      </div>
      <ShareModal
        deleteUserClbk={async (e: any) => {
          let value:any = selectedSlot
          dispatch(updateAdminAppointmentSlotsRequest(value));
        }}
        openModal={deleteModalShow}
        closeModal={deleteCloseModal}
        text="Are you sure you want to Book this time slot"
        heading= "Are you sure you want to book"
        button= "Update"
      />
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
  );
}

export { AvailabilityAppointment }
