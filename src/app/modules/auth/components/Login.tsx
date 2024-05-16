/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {loginRequest} from '../../../redux/reducer/authSlice'
import {toast} from 'react-toastify'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'Qwerty@1',
}
export function Login() {
  const state = useSelector((state: any) => state.auth)
  const [loading, setLoading] = useState(state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('token', state.token)
    } else {
      if (state.error?.data?.responseCode === 400) {
        toast.error(state.error?.data?.responseMessage, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        })
      }
    }
  }, [state])

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      dispatch(loginRequest(values))
    },
  })

  return (
    <>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >
        <div className='text-start mb-9'>
          <h1 className='mb-3'>Welcome </h1>
        </div>
        <div className='fv-row mb-7'>
          <label className='form-label'>Email</label>
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control bg-transparent',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
        <div className='fv-row mb-4'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        <div className='d-flex flex-start flex-wrap gap-3 fs-base fw-semibold mb-12'>
          <div />
          <Link to='/auth/forgot-password' className='forget-link'>
            Forgot Password ?
          </Link>
        </div>
        <div className='d-grid mb-10'>
          <button
            className='blackBtn'
            type='submit'
            id='kt_sign_in_submit'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Login</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
