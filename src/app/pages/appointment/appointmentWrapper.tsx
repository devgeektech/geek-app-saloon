import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import './style.scss'
import {Dropdown, Tab, Table, Tabs} from 'react-bootstrap'
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
import { REQUIRED_FIELD } from '../../utils/ErrorMessages'

const AppointmentWrapper = () => {
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
          if(!saloonId){
            return toast.info("Select Saloon First!")
          }
          
          const data = { ...values, saloonId };
          if (editMode) {
            let res=await updateAppointment(appointmentId, data);
            if (res.status === 200) {
                dispatch(updateAppointmentSuccess(res.data));
            }
          } else {
            let res=await addAppointment(data);
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
  const editAppointment = (item:any) => {
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
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
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
          <p className='viewList'>viewing 2 of 6 of 6</p>
          <Tabs defaultActiveKey='past' id='uncontrolled-tab-example'>
            <Tab eventKey='past' title='Past'>
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='filterDropdown'
                      variant='success'
                      id='dropdown-basic'
                    >
                      Fillter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className='tableWrapper mb-5'>
                <h2 className='h2'>My Upcoming Appointments</h2>
                <Table responsive className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>
                        <input type='checkbox' />
                      </th>
                      <th>Sr no</th>
                      <th>Appointment ID</th>
                      <th>Salon</th>
                      <th>Customer Name</th>
                      <th>Service (Category)</th>
                      <th>Sub-Category</th>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>002</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='unpaidbadge'>Unpaid</span>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <button className='editBtn' onClick={()=>editAppointment({_id:1})}>
                            <img src={pencilEditIcon} alt='pencilEditIcon' />
                          </button>
                          <button className='deleteBtn'>
                            <img src={deleteIcon} alt='deleteIcon' />
                          </button>
                        </div>
                      </td>
                    </tr>
                   
                    <tr>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>005</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
                      <td>
                        <div className='d-flex'>
                          <button className='editBtn' onClick={()=>editAppointment({_id:1})}>
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
            </Tab>
            <Tab eventKey='upcoming' title='Upcoming'>
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='filterDropdown'
                      variant='success'
                      id='dropdown-basic'
                    >
                      Fillter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className='tableWrapper mb-5'>
                <h2 className='h2'>My Upcoming Appointments</h2>
                <Table responsive className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>
                        <input type='checkbox' />
                      </th>
                      <th>Sr no</th>
                      <th>Appointment ID</th>
                      <th>Salon</th>
                      <th>Customer Name</th>
                      <th>Service (Category)</th>
                      <th>Sub-Category</th>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>001</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
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
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>002</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='unpaidbadge'>Unpaid</span>
                      </td>
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
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>003</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
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
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>004</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
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
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>005</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
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
                      <td>
                        <input type='checkbox' />
                      </td>
                      <td>006</td>
                      <td>545151511451</td>
                      <td>Cleaned Salon</td>
                      <td>Joe Doe</td>
                      <td>Hair, Massage</td>
                      <td>1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)</td>
                      <td>Tue, Sept 4, 11:30 am</td>
                      <td>
                        <span className='pending'>Pending</span>
                      </td>
                      <td>
                        <span className='paidbadge'>Paid</span>
                      </td>
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
      {/* Dashboard Page Html End */}
    </>
  )
}

export {AppointmentWrapper}
