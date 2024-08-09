import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Dropzone from '../../../_metronic/images/Dropzone.png'
import './style.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload } from '../../services/_requests'
import { addCategoryRequest, getCategoryRequest, resetCategoryForm, updateCategoryRequest } from '../../redux/reducer/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { getImageUrl, renderMessageToaster } from '../../utils/common'
import { FILE_SIZE, INVALID_IMAGE, UNABLE, UNKNOWN } from '../../utils/ErrorMessages'
import { fileTypeMap } from '../../utils/const'

export default function CategoryTabs() {
  const dispatch = useDispatch()
  const { initialValues } = useSelector((state: any) => state.category);
  const loading = false

  const categorySchema: any = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Category is required'),
    image: Yup.string().required('Photo is required'),
  })

  const formik: any = useFormik({
    initialValues,
    validationSchema: categorySchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (values.id) {
        dispatch(updateCategoryRequest({ id: values.id, ...values }));
      } else {
        dispatch(addCategoryRequest(values));
      }
      getCategoryList();
      formik.resetForm();
    },
  })

  const handleFileChange = async (e: any) => {
    if (e.target?.files && e.target?.files.length > 0) {
      const file = e.target.files[0];
      const fileSize = file.size / 1024 / 1024;

      if (fileSize > 2) {
        renderMessageToaster(FILE_SIZE, 'error');
        return;
      }

      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        const result = fileReader.result;
        if (result && typeof result !== 'string') {
          const arr = new Uint8Array(result).subarray(0, 4);
          const header = arr.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), "");

          const fileType = fileTypeMap[header] || UNKNOWN;

          if (fileType === UNKNOWN) return renderMessageToaster(INVALID_IMAGE, 'error');

          // setFile(URL.createObjectURL(file));
          formik.setFieldValue("image", URL.createObjectURL(file))
          const formData = new FormData();
          formData.append('image', file);
          commonFileUpload(formData).then((res) => {
            if (res.data.responseCode === 200) {
              formik.setFieldValue('image', res.data.data.url);
            }
          });

        } else {
          renderMessageToaster(UNABLE, 'error');
        }
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  const getCategoryList = () => {
    dispatch(getCategoryRequest({}))
  }

  const resetForm = () => {
    dispatch(resetCategoryForm());
    formik.resetForm();
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='main-category'>
        <Row>
          <Col md={12}>
            <div className='add-category'>
              <h2 className='page_title'>{formik.values.id ? 'Update Category': "Add Category"} </h2>
            </div>
          </Col>
          <Col md={4}>
            <div className='inr-add-category'>
              <div className='fv-row mb-4'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  autoComplete='off'
                  placeholder='Enter Category Name'
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
          </Col>
          <Col md={4}>
            <div className='inr-add-categorytwo'>
              <div className='inr-data'>
                <h3>Upload Picture</h3>
                {/* <p>Upload Picture of Category</p> */}
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

                  <input
                    type='file'
                    placeholder='Image'
                    // {...formik.getFieldProps('image')}
                    accept="image/*"
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
                <img src={formik.values.image ? getImageUrl(formik.values.image) : Dropzone} alt='UploadImage' />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className='text-end d-flex align-items-center justify-content-end gap-5'>
              <button type='button' onClick={() => resetForm()} className='whitebtn'>Cancel</button>
              <button
                className='blackBtn btn-sm'
                type='submit'
                id='kt_sign_in_submit'
                disabled={!(formik.values.name && formik.values.image && formik.isValid)}
              >
                {!loading && <span className='indicator-label'>Save</span>}
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
  )
}
