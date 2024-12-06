import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import { REQUIRED } from '../../utils/const';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointmentSuccess, getAppointmentRequest, setAppointmentId, updateAppointmentSuccess } from '../../redux/reducer/appointmentSlice'
import { addAppointment, deleteAppointmentApi, getAppointment, updateAppointment } from '../../services/_requests'
import AppointmentModal from './appointmentModal'
import { Link } from 'react-router-dom'
import { REQUIRED_FIELD } from '../../utils/ErrorMessages'
import moment from 'moment';
import DeleteModal from '../../components/common/modal/DeleteModal'


const AppointmentWrapper = () => {
  const intl = useIntl();
  const dispatch: any = useDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { appointmentList, totalRecord, loading, appointmentId } = useSelector((state: any) => state?.appointment) || [];
  const { saloonId } = useSelector((state: any) => state.saloon);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteAppointmnetId, setDeleteAppointmentId] = useState("");
  const [key, setKey] = useState('prev');
  const deleteCloseModal = () => {
    setDeleteModal(false);
  };
  const deleteOpenModal = (id:any) => {
    setDeleteModal(true);
    setDeleteAppointmentId(id);
  };
  const deleteAppointment: any = async (event: any) => {
    if (event === true) {
      await deleteAppointmentApi(deleteAppointmnetId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("Appointment Deleted Successfully");
          setDeleteModal(false);
          dispatch(getAppointmentRequest({ skip: 0, limit: 10, search: '', type: key }))
        }
      });
     
    }
  };
  const handleSelect = (k) => {
    setKey(k);
  };
  useEffect(() => {
    dispatch(getAppointmentRequest({ skip: 0, limit: 10, search: '', type: key }))
  }, [dispatch, key])

  const initialValues = {
    name: '',
    gender: '',
    age: '',
    aboutUs: '',
    qualification: '',
  }


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
    setEditMode(true);
    dispatch(setAppointmentId(item?._id));
    setModalShow(true);
    formik.setValues(item);
  };

  const getDate = (date)=> {
    const formattedDate = moment(date).format('ddd, MMM D, h:mm a');
    return formattedDate   
  }

  const closeAppointmentModal = () => {
    setModalShow(false);
    formik.resetForm();
  };
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
    
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={appointmentBlackIcon} alt='appointmentBlackIcon' />
              Appointments & Rescheduling
            </h2>
            <p>Empowers you to manage appointments efficiently</p>
          </div>
          <Link to={'/appointment/availability'}><button className='yellowBtn'>Availability</button></Link>
        </div>
        <div className='tabWrapper'>
          <Tabs defaultActiveKey='prev' id='uncontrolled-tab-example' activeKey={key} onSelect={(k:any) => handleSelect(k)}>
            <Tab eventKey='prev' title='Prev'>
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
               
              </div>
              <div className='tableWrapper mb-5'>
                <h2 className='h2'>My Upcoming Appointments</h2>
                <Table responsive className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Sr no</th>
                      <th>Salon</th>
                      <th>Customer Name</th>
                      <th>Service (Category)</th>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentList.map((item: any, index:number) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.saloonData?.name ? item.saloonData?.name : ""}</td>
                        <td>{item.customerDetails?.name ? item.customerDetails.name : ""}</td>  
                        <td>{ item.productsSummary ? item?.productsSummary : "" }</td>
                        <td>{
                          item.date? getDate(item.date) : ""
                          }
                        </td>
                        <td>{ (item.appointmentStatus ? item.appointmentStatus: '').toUpperCase() }</td>
                        <td>{ (item.paymentStatus ? item.paymentStatus: '').toUpperCase() }</td>
                        <td>
                          <div className='d-flex'>
                            <button className='deleteBtn' onClick={() => deleteOpenModal(item._id)}>
                              <img src={deleteIcon} alt='deleteIcon' />
                            </button>
                          </div>
                        </td> 
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey='upcoming' title='Upcoming'>
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                
              </div>
              <div className='tableWrapper mb-5'>
                <h2 className='h2'>My Upcoming Appointments</h2>
                <Table responsive className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Sr no</th>
                      <th>Salon</th>
                      <th>Customer Name</th>
                      <th>Service (Category)</th>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentList.map((item: any, index:number) => (
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.saloonData?.name ? item.saloonData?.name : ""}</td>
                        <td>{item.customerDetails?.name ? item.customerDetails.name : ""}</td>
                        
                        <td>{ item.productsSummary ? item?.productsSummary : "" }</td>
                        <td>{
                          item.date? getDate(item.date) : ""
                          }
                        </td>
                        <td>{ (item.appointmentStatus ? item.appointmentStatus: '').toUpperCase() }</td>
                        <td>{ (item.paymentStatus ? item.paymentStatus: '').toUpperCase() }</td>
                        <td>
                          <div className='d-flex'>
                            <button className='deleteBtn' onClick={() => deleteOpenModal(item._id)}>
                              <img src={deleteIcon} alt='deleteIcon' />
                            </button>
                          </div>
                        </td> 
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteAppointment(e);
        }}
        openModal={deleteModalShow}
        closeModal={deleteCloseModal}
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
  )
}

export { AppointmentWrapper }
