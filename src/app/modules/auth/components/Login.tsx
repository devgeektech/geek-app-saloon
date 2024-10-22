/* eslint-disable jsx-a11y/anchor-is-valid */
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../../redux/reducer/authSlice";
import FieldInputText from "../../../components/common/inputs/FieldInputText";
import { INVALID_EMAIL } from "../../../utils/ErrorMessages";
import { getSaloonRequest } from "../../../redux/reducer/saloonSlice";
import { useEffect } from "react";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(INVALID_EMAIL)
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "admin@demo.com",
  password: "Qwerty@1",
};
export function Login() {
  const authState = useSelector((authState: any) => authState.auth);
  const {token} = useSelector((state: any) => state.helper);
  const dispatch = useDispatch();
  const defaultProps={
    lat:30.741482, lng:76.768066, skip:0, limit:10, searchUser:""
  }


  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      dispatch(loginRequest(values));
      // dispatch(getSaloonRequest(defaultProps));
    },
  });

  useEffect(()=>{
    if(token){
      dispatch(getSaloonRequest(defaultProps));
    }
  },[token])

  return (
    <>
      <FormikProvider value={formik}>
        <form
          className="form w-100"
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          <div className="text-start mb-9">
            <h1 className="mb-3">Welcome </h1>
          </div>
          <div className="fv-row mb-7">
            <Field
              name="email"
              validate={loginSchema}
              type="email"
              label="Email"
              component={FieldInputText}
            />
          </div>
          <div className="fv-row mb-4">
            <Field
              name="password"
              validate={loginSchema}
              type="password"
              label="Paswword"
              component={FieldInputText}
            />
          </div>
          <div className="d-flex flex-start flex-wrap gap-3 fs-base fw-semibold mb-12">
            <div />
            <Link to="/auth/forgot-password" className="forget-link">
              Forgot Password ?
            </Link>
          </div>
          <div className="d-grid mb-10">
            <button
              className="blackBtn"
              type="submit"
              id="kt_sign_in_submit"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {<span className="indicator-label">Login</span>}
              {/* {authState && authState.loading && (
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
        </form>
      </FormikProvider>
    </>
  );
}
