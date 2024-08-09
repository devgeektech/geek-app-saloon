import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { deleteVender, getVendors } from '../../services/_requests'
import Pagination from '../../components/common/pagination'
import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import './style.scss'
import DeleteModal from '../../components/common/modal/DeleteModal'
import './style.scss'
import Form from 'react-bootstrap/Form'
import '../appointment/style.scss'
import { Col, Row, Table, } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload } from '../../services/_requests'
import NoDataFound from '../../components/common/noDataFound/NoDataFound'
import { useDebounce } from '../../../_metronic/helpers'
import { getImageUrl } from '../../utils/common'

const ShopWrapper = () => {
  const intl = useIntl()
  const [vendors, setVendors] = useState([])
  const [lat, setLat] = useState(30.741482)
  const [lng, setLang] = useState(76.768066)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [totalRecord, setTotalRecord] = useState(0)
  const [modalShow, setModalShow] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [show, setShow] = useState(false)
  const [debounceVal, setDebounceVal] = useState("");

  useEffect(() => {
    vendorsList()
  }, [skip, debounceVal])

  const initialValues = {
    name: '',
    image: '',
    category: '',
    subcategory: '',
    gender: [],
    description: '',
    cost: '',
    time: '',
  }

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    image: Yup.string().required('Image is required'),
    category: Yup.string().required('category is required'),
    subcategory: Yup.string().required('Sub category is required'),
    gender: Yup.array().min(1).required('Please Select a gender'),
    description: Yup.string()
      .min(10, 'Minimum 10 charectors')
      .max(50, 'Maximum 50 charectors')
      .required('Description is required'),
    time: Yup.string().required('Time is required'),
    cost: Yup.string().required('Cost is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        
      }
      catch (error) {
        console.log(error);
      }
    },  
  })

  const vendorsList = () => {
    getVendors(lat, lng, skip, limit, searchUser).then((res: any) => {
      if (res.status === 200) {
        setVendors(res.data?.data)
        setTotalRecord(res.data?.totalRecord)
      }
    })
  }

  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
  };

  const deleteCloseModal = () => {
    setModalShow(false);
  };

  const paginitionClbk = (val?: any) => {
    let skip1 = (val - 1) * limit
    setSkip(skip1)
  }


  const deleteUser: any = async (event: any) => {
    if (event === true) {
      await deleteVender(deleteUserId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("User Deleted Successfully");
          setModalShow(false);
          vendorsList();
        }
      });
      setModalShow(false);
      vendorsList();
    }
  };

  const addBannerModal = () => {
    setShow(true);
  };

  const closeBannerModal = () => {
    setShow(false);
  };

  const debounceValue = useDebounce(searchUser, 1000);

  useEffect(() => {
    setDebounceVal(searchUser);
  }, [debounceValue]);

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={coupon} alt='coupon' />
              Vendors
            </h2>
          </div>
          <button onClick={() => { addBannerModal() }} className='yellowBtn'>Add</button>
        </div>
        <div className='tabWrapper'>
          <div className='searchbar_filter d-flex justify-content-end mb-5'>
            <div className='searchbar'>
              <input
                onChange={(e) => setSearchUser(e.target.value)}
                type='text' className='form-control' placeholder='Search...' />
              <button>
                <img src={searchIcon} alt='searchIcon' />
              </button>
            </div>
            {/* <div className='filterWrapper'>
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
            </div> */}
          </div>
          <div className='tableWrapper mb-5'>
            <Table responsive className='table table-bordered coupons'>
              <thead>
                <tr>
                  {/* <th>
              <input type='checkbox' />
            </th> */}
                  {/* <th>Sr no</th> */}
                  <th>Vendor's Name</th>
                  <th>Image</th>
                  <th>Phone</th>
                  <th>Street Address / City</th>
                  {/* <th>Status</th>
                  <th>Created At</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors &&
                  vendors.length > 0 &&
                  vendors.map((item: any, index) => (
                    <tr key={index}>
                      {/* <td>
                  <input type='checkbox' />
                </td> */}
                      {/* <td>{`${index + 1}`}</td> */}
                      <td>{item?.name}</td>
                      <td>
                        <img className='profileImg' src={item?.photo ? getImageUrl(item?.photo) : dummyImg} alt='' />
                      </td>

                      <td>{item?.phone}</td>
                      <td>
                        {item?.address?.streetAddress} /{item?.address?.city}{' '}
                      </td>
                      {/* <td>{item?.createdAt}</td> */}
                      {/* <td className='active'>
                        {' '}
                        Active
                        <label className='switch'>
                          <input type='checkbox' defaultChecked />
                          <span className='slider round'></span>
                        </label>
                      </td> */}
                      <td>
                        <div className='d-flex'>
                          <button className='editBtn'>
                            <img src={pencilEditIcon} alt='pencilEditIcon' />
                          </button>
                          <button className='deleteBtn'>
                            <img src={deleteIcon} alt='deleteIcon'
                              onClick={() => deleteOpenModal(item._id)}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>

            </Table>
            {vendors.length === 0 && <>
              <NoDataFound />
            </>}
            <div className='select-all mt-4 d-flex align-items-center'>
              <label className='d-flex align-items-center gap-2'>
                {/* <input type='checkbox'></input>select-all */}
              </label>
            </div>
            {totalRecord > 10 && <Pagination
              data={vendors}
              limit={limit}
              totalRecord={totalRecord}
              paginitionClbk={(e: any) => {
                paginitionClbk(e)
              }}
            />}
          </div>
        </div>
      </div>
      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />

      <>
        <Modal show={show} onHide={closeBannerModal}>
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header>
              <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Row>
                  <Col sm={6}>
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Name</label>
                      <input
                        type='text'
                        autoComplete='off'
                        placeholder='Service Name'
                        {...formik.getFieldProps('name')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.name && formik.errors.name,
                          },
                          {
                            'is-valid': formik.touched.name && !formik.errors.name,
                          }
                        )}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.name}</span>
                          </div>
                        </div>
                      )}
                    </div>


                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Description</label>
                      <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='Service Name'
                        {...formik.getFieldProps('description')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.description && formik.errors.description,
                          },
                          {
                            'is-valid': formik.touched.description && !formik.errors.description,
                          }
                        )}
                      />
                      {/* {formik.touched.description && formik.errors.description && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.description}</span>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Cost</label>
                      <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder='Cost'
                        {...formik.getFieldProps('cost')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.cost && formik.errors.cost,
                          },
                          {
                            'is-valid': formik.touched.cost && !formik.errors.cost,
                          }
                        )}
                      />
                      {formik.touched.cost && formik.errors.cost && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.cost}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Time</label>
                      <input
                        type='text'
                        autoComplete='off'
                        placeholder='Time'
                        {...formik.getFieldProps('time')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.time && formik.errors.time,
                          },
                          {
                            'is-valid': formik.touched.time && !formik.errors.time,
                          }
                        )}
                      />
                      {formik.touched.time && formik.errors.time && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.time}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-grid d-flex mb-10">
                <button
                  onClick={closeBannerModal}
                  className="blackBtn btn-sm mx-2"
                  type="button"
                >
                  <span className="indicator-label1">Cancel</span>
                </button>
                <button className="blackBtn btn-sm" type="submit" id="kt_sign_in_submit"              >
                  <span className="indicator-label">Add</span>
                  {/* } */}
                  {/* {loading && (
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
        </Modal>
      </>
    </>
  )
}

export { ShopWrapper }
