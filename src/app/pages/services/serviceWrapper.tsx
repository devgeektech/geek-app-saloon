import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import settingIcon from '../../../_metronic/images/setting.svg'
import Pagination from '../../components/pagenation/index'
import TableInner from '../../components/serviceTable/index'
import './styles.scss'
import Form from 'react-bootstrap/Form'
import '../appointment/style.scss'
import { Col, Dropdown, FloatingLabel, Row, Tab, Table, Tabs } from 'react-bootstrap'
import CategoryTabs from '../../components/categoryTable/index'
import TableCategory from '../../components/categoryTable/tableCategory'
import SubCategoryTabs from '../../components/subCategoryTabs/index'
import TableSubCategory from '../../components/subCategoryTabs/tableSubCategory'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload } from '../../services/_requests'
import { useDispatch, useSelector } from 'react-redux'
import { serviceRequest, getServiceRequest } from '../../redux/reducer/serviceSlice'
import { closeModalRequest, openModalRequest } from '../../redux/reducer/modalSlice'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'
import { getSubCategoryRequest } from '../../redux/reducer/subCategorySlice'

const ServiceWrapper = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('Services')
  const [file, setFile] = useState('')
  const [subCategories, setSubcategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const categoriesState: [] = useSelector((state: any) => state.category.categoryList)
  const subCategriesState: [] = useSelector((state: any) => state.subcategory.subCategoryList)
  const serviceState: [] = useSelector((state: any) => state.service.serviceList)

  const state: any = useSelector(state => state);

  // category
  const [services, setServices] = useState([])
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [totalRecord, setTotalRecord] = useState(state.category.totalRecord);
  const [search, setSearch] = useState('')

  // subcategory
  const [skip1, setSkip1] = useState(0)
  const [totalRecord1, setTotalRecord1] = useState(state.subcategory.totalRecord);
  const [search1, setSearch1] = useState('')
  const [limit1, setLimit1] = useState(10)

  // services
  const [skip2, setSkip2] = useState(0)
  const [totalRecord2, setTotalRecord2] = useState(state.service.totalRecord);
  const [search2, setSearch2] = useState('')
  const [limit2, setLimit2] = useState(10)

  const { isOpen } = useSelector((state: any) => state.modal);


  useEffect(() => {
    dispatch(getCategoryRequest({ search, skip, limit }));
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    dispatch(getSubCategoryRequest({ search1, skip1, limit1 }));
  }, [dispatch, search1, skip1, limit1]);

  useEffect(() => {
    dispatch(getServiceRequest({ search2, skip2, limit2 }));
  }, [dispatch, search2, skip2, limit2]);


  // useEffect(() => {
  //   dispatch(getCategoryRequest({}))
  //   dispatch(getServiceRequest({}))
  //   dispatch(getSubCategoryRequest({}))
  // }, [dispatch])

  


  const paginitionClbk = (val?: any) => {
    let skip1 = (val - 1) * limit
    setSkip1(skip1)
  }


  useEffect(() => {
    setShow(isOpen)
  }, [isOpen])

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
      dispatch(serviceRequest({ ...values }))
      dispatch(closeModalRequest({}))
    },
  })

  const handleFileChange = async (e) => {
    if (e.target?.files && e.target?.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]))
      const formData = new FormData()
      formData.append('image', e.target?.files[0])
      await commonFileUpload(formData).then((res: any) => {
        if (res.data.responseCode === 200) {
          formik.setFieldValue('image', res.data.data.url)
        }
      })
    }
  }
  const tags = ['Male', 'Female']
  const handleChange = (e) => {
    const { checked, name } = e.target
    if (checked) {
      formik.setFieldValue('gender', [...formik.values.gender, name])
    } else {
      formik.setFieldValue(
        'gender',
        formik.values.gender.filter((v) => v !== name)
      )
    }
  }

  const handleCategoryChange = (e: any) => {
    formik.setFieldValue('category', e.target.value)
    setSelectedCategory(e.target.value)
    setSelectedSubCategory('')
    formik.setFieldValue('subcategory', '')
    const result = subCategriesState.filter((item) => item['categoryId']['_id'] === e.target.value)
    setSubcategories([...result])
  }

  const handleSubCategoryChange = (e: any) => {
    formik.setFieldValue('subcategory', e.target.value)
    setSelectedSubCategory(e.target.value)
  }

  const cancelButton = () => {
    dispatch(closeModalRequest({}))
  }

  const modalClose = () => {
    dispatch(closeModalRequest({}))
  }
  const modalShow = () => {
    dispatch(openModalRequest({}))
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={settingIcon} alt='settingIcon' />
              Services
            </h2>
            {/* <p>Facilitate seamless control over services offered by you</p> */}
          </div>
          <button onClick={modalShow} className='yellowBtn'>
            Add
          </button>
        </div>
        <div className='tabWrapper'>
          {/* <p className='viewList'>viewing 2 of 6 of 6</p> */}
          <Tabs
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            defaultActiveKey='Services'
            id='uncontrolled-tab-example'
          >
            <Tab eventKey='Services' title='Services'>
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
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
              <div className='tableWrapper my-5'>
                <TableInner />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {totalRecord2 > 10 && <Pagination
                data={serviceState}
                limit={limit2}
                totalRecord={totalRecord2}
                paginitionClbk={(e: any) => {
                  paginitionClbk(e)
                }}
              />}
            </Tab>
            {/* Category Tab Started */}
            <Tab eventKey='Category' title='Category'>
              <CategoryTabs />
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
              </div>
              <div className='tableWrapper my-5'>
                <TableCategory />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {/* <Pagination /> */}
              {totalRecord > 10 && <Pagination
                data={categoriesState}
                limit={limit}
                totalRecord={totalRecord}
                paginitionClbk={(e: any) => {
                  paginitionClbk(e)
                }}
              />}
            </Tab>

            {/*Sub Category Tab Started */}
            <Tab eventKey='Sub-Category' title='Sub-Category'>
              <SubCategoryTabs />
              <div className='searchbar_filter d-flex justify-content-end'>
                <div className='searchbar'>
                  <input type='text' className='form-control' placeholder='Search...' />
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
              <div className='tableWrapper my-5'>
                <TableSubCategory />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {totalRecord1 > 10 && <Pagination
                data={subCategriesState}
                limit={limit1}
                totalRecord={totalRecord1}
                paginitionClbk={(e: any) => {
                  paginitionClbk(e)
                }}
              />}
            </Tab>
          </Tabs>
        </div>
      </div>
      <>
        <Modal show={show} onHide={modalClose}>
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
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Category</label>
                      <select
                        aria-label='Default select example'
                        placeholder='Category'
                        {...formik.getFieldProps('category')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.category && formik.errors.category,
                          },
                          {
                            'is-valid': formik.touched.category && !formik.errors.category,
                          }
                        )}
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                      >
                        <option disabled value=''>
                          {' '}
                          Select
                        </option>
                        {categoriesState &&
                          categoriesState.length > 0 &&
                          categoriesState.map((item: any) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      {formik.touched.category && formik.errors.category && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.category}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='fv-row mb-4'>
                      <label className='form-label'>Sub category</label>
                      <select
                        aria-label='Default select example'
                        placeholder='Sub category'
                        {...formik.getFieldProps('subcategory')}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.subcategory && formik.errors.subcategory,
                          },
                          {
                            'is-valid': formik.touched.subcategory && !formik.errors.subcategory,
                          }
                        )}
                        onChange={(e: any) => {
                          handleSubCategoryChange(e)
                        }}
                        value={selectedSubCategory}
                      >
                        <option disabled value=''>
                          {' '}
                          Select
                        </option>
                        {subCategories &&
                          subCategories.length > 0 &&
                          subCategories.map((item: any) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      {formik.touched.subcategory && formik.errors.subcategory && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.subcategory}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div>
                      <label className='form-label'>
                        <small>Upload Picture</small>
                      </label>
                      <div className='fv-row mb-4'>
                        <input
                          type='file'
                          placeholder='Image'
                          // {...formik.getFieldProps('image')}
                          className={clsx(
                            'form-control bg-transparent',
                            {
                              'is-invalid': formik.touched.image && formik.errors.image,
                            },
                            {
                              'is-valid': formik.touched.image && !formik.errors.image,
                            }
                          )}
                          // value={formik.values.image}
                          onChange={(e: any) => {
                            handleFileChange(e)
                          }}
                        />
                        {formik.touched.image && formik.errors.image && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.image}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {file && (
                          <img className='w-100 rounded-2' src={file && file} alt='UploadImage' />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {tags.map((tag: any) => (
                      <div key={tag}>
                        <input
                          {...formik.getFieldProps('gender')}
                          id={tag}
                          type='checkbox'
                          name={tag}
                          checked={formik.values.gender.includes(tag as never)}
                          onChange={handleChange}
                        />
                        <label htmlFor={tag}>{tag}</label>
                      </div>
                    ))}
                    {formik.touched.gender && formik.errors.gender && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.gender}</span>
                        </div>
                      </div>
                    )}
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
                      {formik.touched.description && formik.errors.description && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.description}</span>
                          </div>
                        </div>
                      )}
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

              <div className='d-grid mb-10'>
              {/* <Button className='blackBtn btn-sm' onClick={cancelButton}>
                Cancel
              </Button> */}
                <button
                  className='blackBtn btn-sm'
                  type='submit'
                  id='kt_sign_in_submit'
                  // disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && <span className='indicator-label'>Add</span>}
                  {loading && (
                    <span className='indicator-progress' style={{ display: 'block' }}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    </>
  )
}

export { ServiceWrapper }
