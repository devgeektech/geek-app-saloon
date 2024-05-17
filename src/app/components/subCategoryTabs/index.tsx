import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Tabs } from 'react-bootstrap'
import Dropzone from '../../../_metronic/images/Dropzone.png'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload } from '../../services/_requests'
import { useFormik } from 'formik'
import { addSubCategoryRequest, getSubCategoryRequest } from '../../redux/reducer/subCategorySlice'

export default function SubCategoryTabs() {
  const dispatch = useDispatch()
  const categoryList = useSelector((state: any) => state.category.categoryList)

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    dispatch(getCategoryRequest({}))
  }

  const [file, setFile] = useState('')
  const loading = false

  const categorySchema = Yup.object().shape({
    id: Yup.string().required('Category is required'),
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Name is required'),
    image: Yup.string().required('Image is required'),
  })

  const initialValues = {
    id: '',
    name: '',
    image: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      dispatch(addSubCategoryRequest(values));
      getSubCategoryList()
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

  const params = {
    skip: 0,
    search: '',
    limit: 10,
  }

  useEffect(() => {
    getSubCategoryList()
  }, [dispatch])

  const getSubCategoryList = () => {
    dispatch(getSubCategoryRequest(params))
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='main-category'>
          <Row>
            <Col md={12}>
              <div className='add-category'>
                <h2 className='page_title'>Add Category</h2>
              </div>
            </Col>
            <Col md={4}>
              <div className='inr-add-category'>
                <label>Category</label>
                <select
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.id && formik.errors.id,
                    },
                    {
                      'is-valid': formik.touched.id && !formik.errors.id,
                    }
                  )}
                  {...formik.getFieldProps('id')}
                >
                  <option value='' disabled>
                    Select
                  </option>
                  {categoryList.map((item: any, index: number) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* <label>Enter Sub-Category Name</label> */}
                <div className='inr-add-category'>
                  {/* <label>Enter Category Name</label>
              <input type='text' name='email' placeholder='Enter Category Name'></input> */}
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
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className='inr-add-categorytwo'>
                <div className='inr-data'>
                  <h3>Upload Picture</h3>
                  <p>Upload Picture of Category</p>
                </div>
                <div className='inr-right-img'>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='40' height='40' rx='20' fill='#F3CB8E' fillOpacity='0.1' />
                    <path
                      d='M13.9968 20.76L21.3723 13.786C22.8293 12.4083 25.1347 12.249 26.6454 13.5673C28.3748 15.0751 28.3963 17.7092 26.765 19.2517L18.1486 27.3991C17.2353 28.2626 15.786 28.3916 14.8384 27.5709C13.7449 26.624 13.7298 24.9743 14.7546 24.0053L22.0744 17.0839C22.4578 16.7214 23.0682 16.7385 23.4308 17.122C23.7934 17.5054 23.7764 18.1158 23.3929 18.4784L17.2931 24.2462C17.0073 24.5164 16.9944 24.9776 17.2647 25.2634C17.535 25.5493 17.9962 25.5622 18.282 25.292L24.2843 19.6165C25.1975 18.7529 25.4073 17.3131 24.6409 16.3211C23.7566 15.1764 22.1103 15.0691 21.0855 16.0381L13.8842 22.8474C12.4272 24.2251 12.1393 26.5179 13.3711 28.0999C14.7864 29.9179 17.4086 30.0797 19.0399 28.5372L27.5936 20.4491C29.5943 18.5573 30.0014 15.399 28.3042 13.227C26.3443 10.7354 22.7467 10.5055 20.5019 12.6281L13.0079 19.7142C12.722 19.9845 12.7092 20.4456 12.9795 20.7315C13.2498 21.0174 13.7109 21.0303 13.9968 20.76Z'
                      fill='#F3CB8E'
                    />
                  </svg>
                  <div className='fv-row mb-4'>
                    <label className='form-label'>Name</label>
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
                </div>
              </div>
              <div className='spacing-left'>
                <div className='upload-img pl-5'>
                  <img src={file ? file : Dropzone} alt='UploadImage' />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className='text-end d-flex align-items-center justify-content-end gap-5'>
                <button className='whitebtn'>Cancel</button>
                <button
                  className='blackBtn btn-sm'
                  type='submit'
                  id='kt_sign_in_submit'
                  disabled={formik.isSubmitting || !formik.isValid}
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
            </Col>
          </Row>
        </div>
      </form>
    </>
  )
}