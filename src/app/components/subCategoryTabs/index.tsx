import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Dropzone from '../../../_metronic/images/Dropzone.png'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'
import * as Yup from 'yup'
import clsx from 'clsx'
import { commonFileUpload } from '../../services/_requests'
import { useFormik } from 'formik'
import { addSubCategoryRequest, getSubCategoryRequest, resetSubCategoryForm, updateSubCategoryRequest } from '../../redux/reducer/subCategorySlice'
import { getImageUrl, renderMessageToaster } from '../../utils/common'
import { FILE_SIZE, INVALID_IMAGE, UNABLE, UNKNOWN } from '../../utils/ErrorMessages'
import { fileTypeMap } from '../../utils/const'
import UploadIcon from '../common/Icons/UploadIcon'

export default function SubCategoryTabs() {
  const dispatch = useDispatch()
  const categoryList = useSelector((state: any) => state.category.categoryList)
  const { initialValues} = useSelector((state: any) => state.subcategory);
  const loading = false;

  useEffect(() => {
    getCategoryList();
    dispatch(resetSubCategoryForm());
  }, [])

  const getCategoryList = () => {
    dispatch(getCategoryRequest({}))
  }

  const categorySchema = Yup.object().shape({
    categoryId: Yup.string().required('Category is required'),
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Name is required'),
    image: Yup.string().required('Image is required'),
  })

  const formik: any = useFormik({
    initialValues,
    validationSchema: categorySchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (values.id) {
        dispatch(updateSubCategoryRequest(values));
      }
      else {
        dispatch(addSubCategoryRequest(values));
      }
      formik.resetForm();
      getSubCategoryList()
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

  const params = {
    skip: 0,
    search: '',
    limit: 10,
  }

  useEffect(() => {
    getSubCategoryList();
  }, [dispatch])

  const getSubCategoryList = () => {
    dispatch(getSubCategoryRequest(params))
  }

  const resetForm = () => {
    formik.resetForm();
    dispatch(resetSubCategoryForm());
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='main-category'>
          <Row>
            <Col md={12}>
              <div className='add-category'>
                <h2 className='page_title'>{initialValues.id ? 'Update': 'Add'} Sub Category</h2>
              </div>
            </Col>
            <Col md={4}>
              <div className='inr-add-category'>
                <label>Category</label>
                <select
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.categoryId && formik.errors.categoryId,
                    },
                    {
                      'is-valid': formik.touched.categoryId && !formik.errors.categoryId,
                    }
                  )}
                  {...formik.getFieldProps('categoryId')}
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
                      placeholder='Enter Sub-Category Name'
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
                      disabled={!formik.values.categoryId}
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
                  <UploadIcon/>
                  <div className='fv-row mb-4'>
                    <input
                      type='file'
                      placeholder='Image'
                      accept="image/*"
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
                  <img src={formik.values.image ? getImageUrl(formik.values.image) : Dropzone} alt='UploadImage' />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className='text-end d-flex align-items-center justify-content-end gap-5'>
                <button onClick={() => resetForm()} type='button' className='whitebtn'>Cancel</button>
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
