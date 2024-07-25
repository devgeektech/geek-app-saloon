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
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload, selectTab } from '../../services/_requests'
import { useDispatch, useSelector } from 'react-redux'
import { serviceRequest, getServiceRequest } from '../../redux/reducer/serviceSlice'
import { closeModalRequest, openModalRequest } from '../../redux/reducer/modalSlice'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'
import { getSubCategoryRequest } from '../../redux/reducer/subCategorySlice'
import Servicetable from '../../components/serviceTable/index'
import FieldInputText from '../../components/InputFeilds/InputTextField'
import FieldSelectInput from '../../components/InputFeilds/InputSelectField'
import FieldInputTextarea from '../../components/InputFeilds/InputTextareaField'

const ServiceWrapper = () => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [file, setFile] = useState('')
  const [subCategories, setSubcategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const state: any = useSelector((state) => state);

  const categoriesState: [] = useSelector((state: any) => state.category.categoryList)
  debugger
  const subCategriesState: [] = useSelector((state: any) => state.subcategory.subCategoryList)
  const serviceState: [] = useSelector((state: any) => state.service.serviceList);
  const [selectedTab, setSelectedTab] = useState(state.service.selectedTab);


  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [totalRecord, setTotalRecord] = useState(state?.category?.totalRecord);
  const [search, setSearch] = useState('')


  const { isOpen } = useSelector((state: any) => state.modal);

  const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true);

const handleCategoryChange = (e: any) => {
  const selectedCategoryId = e.target.value;
  formik.setFieldValue('category', selectedCategoryId);
  setSelectedCategory(selectedCategoryId);
  setSelectedSubCategory('');
  formik.setFieldValue('subcategory', '');

  if (selectedCategoryId) {
    setIsSubCategoryDisabled(false); // Enable subcategory dropdown
    const result = subCategriesState.filter((item) => item['categoryId']['_id'] === selectedCategoryId);
    setSubcategories([...result]);
  } else {
    setIsSubCategoryDisabled(true); // Disable subcategory dropdown
    setSubcategories([]); // Clear subcategories
  }
}


  useEffect(() => {
    if (selectedTab === 'service') {
      dispatch(getServiceRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    if (selectedTab === 'category') {
      dispatch(getCategoryRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    if (selectedTab === 'subcategory') {
      dispatch(getSubCategoryRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  const paginitionClbk = (val?: any) => {
    let skip = (val - 1) * limit
    setSkip(skip)
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
    name: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    subcategory: Yup.string().required('Required'),
    gender: Yup.array().min(1).required('Please Select a gender'),
    description: Yup.string()
      .min(10, 'Minimum 10 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    time: Yup.string().required('Required'),
    cost: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      dispatch(serviceRequest({ ...values }))
      dispatch(closeModalRequest({}))

      // clearForm
      clearFormData()
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

  // const handleCategoryChange = (e: any) => {
  //   formik.setFieldValue('category', e.target.value)
  //   setSelectedCategory(e.target.value)
  //   setSelectedSubCategory('')
  //   formik.setFieldValue('subcategory', '')
  //   const result = subCategriesState.filter((item) => item['categoryId']['_id'] === e.target.value)
  //   setSubcategories([...result])
  // }


  
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
    dispatch(openModalRequest({}));
  }

  const onChangeTab = (key) => {
    setSelectedTab(key)  // Updating local state
    dispatch(selectTab(key))  // Dispatching to Redux
    // Re-fetch data based on selected tab
    switch (key) {
      case 'service':
        dispatch(getServiceRequest({ search, skip, limit }))
        break
      case 'category':
        dispatch(getCategoryRequest({ search, skip, limit }))
        break
      case 'subcategory':
        dispatch(getSubCategoryRequest({ search, skip, limit }))
        break
      default:
        break
    }
  }


  const clearFormData = () => {
    formik.resetForm();
    setSelectedCategory('');
    setSelectedSubCategory('')
    setTimeout(() => {
      setFile('')
    }, 500);
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
            activeKey={selectedTab}
            onSelect={(k: any) => onChangeTab(k)}
            defaultActiveKey='service'
            id='uncontrolled-tab-example'
          >
            <Tab eventKey='service' title='Services'>
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
                <Servicetable />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {totalRecord > 10 && <Pagination
                data={serviceState}
                limit={limit}
                totalRecord={totalRecord}
                paginitionClbk={(e: any) => {
                  paginitionClbk(e)
                }}
              />}
            </Tab>
            {/* Category Tab Started */}
            <Tab eventKey='category' title='Category'>
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
            <Tab eventKey='subcategory' title='Subcategory'>
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
              {totalRecord > 10 && <Pagination
                data={subCategriesState}
                limit={limit}
                totalRecord={totalRecord}
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
          <FormikProvider value={formik}>

            <form onSubmit={formik.handleSubmit}>
              <Modal.Header>
                <Modal.Title>Add</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Row>
                    <Col sm={6}>
                      <div className='fv-row mb-4'>
                        {/* <label className='form-label'>Name</label> */}
                        <Field
                          name="name"
                          validate={serviceSchema}
                          type="text"
                          label="Name"
                          component={FieldInputText}
                        />
                        {/* <input
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
                      )} */}
                      </div>
                      <div className='fv-row mb-4'>
                        <Field
                          as="select"
                          name="category"
                          validate={serviceSchema}
                          label="Select Category"
                          options={categoriesState}
                          component={FieldSelectInput}
                          placeholder="Select Category"
                          
                        />
                        {/* <label className='form-label'>Category</label>
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
                      )} */}
                      </div>
                      <div className='fv-row mb-4'>
                        {/* <label className='form-label'>Sub category</label>
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
                      )} */}

                        <Field
                          as="select"
                          name="subcategory"
                          validate={serviceSchema}
                          label="Select Sub-Category"
                          options={subCategriesState}
                          component={FieldSelectInput}
                          placeholder="Select Sub-Category"
                          onChange={handleSubCategoryChange}

                        />
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
                      <div className='fv-row mb-4'>


                        <Field
                          name="bio"

                          row={70}
                          validate={serviceSchema}
                          type="textarea"
                          label="Description"
                          placeholder="Enter description"
                          component={FieldInputTextarea}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <div className='fv-row mb-4'>

                        <Field
                          name="cost"
                          validate={serviceSchema}
                          type="number"
                          label="Cost"
                          component={FieldInputText}
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className='fv-row mb-4'>

                        <Field
                          name="time"
                          validate={serviceSchema}
                          type="text"
                          label="Time"
                          component={FieldInputText}
                        />
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
          </FormikProvider>
        </Modal>
      </>
    </>
  )
}

export { ServiceWrapper }
