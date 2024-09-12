import { Field, FormikProvider } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import FieldInputText from "../../components/common/inputs/FieldInputText";
import FieldSelectInput from "../../components/common/inputs/FIeldSelectInput";
import attach from "../../../_metronic/assets/images/attach.svg";
import clsx from "clsx";
import FieldCheckBox from "../../components/common/inputs/FieldCheckBox";
import FieldTextArea from "../../components/common/inputs/FieldTextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../utils/common";
import { getVendors } from "../../services/_requests";

export const AddServiceModal = (props) => {
  const {
    formik,
    schema,
    show,
    categories,
    handleFileChange,
    genders,
    cancelButton,
    file
  } = props;
  const [subCategories, setSubcategories] = useState([]);
  const [disablesubCategory, setDisablesubCategory] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [lat, setLat] = useState(30.741482)
  const [lng, setLang] = useState(76.768066)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)

  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    if (show) {
      const fetchVendors = async (lat: any, long: any, skip: any, limit: any, search: any) => {
        try {
          const response = await getVendors(lat, long, skip, limit, search); 
          setVendors(response.data || []);
        } catch (error) {
          console.error('Error fetching vendors:', error);
        }
      };
      fetchVendors(lat,lng,limit,skip,searchUser);
    }
  }, [show]);

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    setSelectedVendor(vendorId);
    formik.setFieldValue('vendor', vendorId);
  };
 
  useEffect(() => {
    if (formik.values.category) {
      const selectedCategory = categories.find(cat => cat._id === formik.values.category);
      if (selectedCategory) {
        setSubcategories(selectedCategory.subCategory);
        setDisablesubCategory(false);
      } else {
        setSubcategories([]);
        setDisablesubCategory(true);
      }
    }
  }, [formik.values.category, categories]);

  const handleCategoryChange = (e) => {
    formik.setFieldValue(e.target.id, e.target.value);
    if (e.target.id === "subcategory") {
      return formik.setFieldValue(e.target.id, e.target.value);
    }
    let index = categories.findIndex(
      (item: any) => e.target.value === item._id
    );
    if (index === -1) {
      setSubcategories([]);
      setDisablesubCategory(true);
    } else {
      setSubcategories(categories[index].subCategory);
      setDisablesubCategory(false);
    }
  };

  const handleChange = (e) => {
    const { checked, id } = e.target;
    if (checked) {
      formik.setFieldValue("gender", [...formik.values.gender, id]);
    } else {
      formik.setFieldValue(
        "gender",
        formik.values.gender.filter((v) => v !== id)
      );
    }
  };

  const handleServiceChange = (e) => {
    formik.setFieldValue(e.target.id, e.target.value);
  };


  return (
    <Modal className="addServicesModal" show={show} onHide={cancelButton}>
      <FormikProvider value={formik}>
      <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(); 
          }}
        >
          <Modal.Header>
            <Modal.Title>{formik.values._id ? 'Update Service' : 'Create Service'} </Modal.Title>
            <button type='button' className='bg-transparent border-0' onClick={cancelButton}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
              >
                <path
                  d='M7.9193 9.49993L0.327318 17.0919C-0.109199 17.5285 -0.109013 18.2361 0.327318 18.6726C0.763836 19.1091 1.47148 19.1091 1.90798 18.6726L9.49997 11.0806L17.092 18.6726C17.5285 19.1091 18.2361 19.1091 18.6726 18.6726C19.1091 18.2361 19.1091 17.5284 18.6726 17.0919L11.0806 9.49993L18.6726 1.90792C19.1089 1.4714 19.1089 0.763754 18.6726 0.32725C18.2361 -0.109081 17.5285 -0.109081 17.092 0.32725L9.49997 7.91926L1.90798 0.32725C1.47147 -0.109081 0.763821 -0.109081 0.327318 0.32725C-0.109013 0.763769 -0.109013 1.47142 0.327318 1.90792L7.9193 9.49993Z'
                  fill='#778CA2'
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col sm={6}>
                
                  <div className="fv-row mb-4">
                    <Field
                      name="name"
                      validate={schema}
                      type="text"
                      label="Name"
                      required={true}
                      component={FieldInputText}
                    />
                  </div>
                
                  <div className="fv-row mb-4">
                
                    <Field
                      as="select"
                      name="category" 
                      validate={schema}
                      label="Category"
                      required={true}
                      options={categories}
                      handleCategoryChange={handleCategoryChange}
                      component={FieldSelectInput}
                    />
                  </div>
                  <div className="fv-row mb-4">
                    <Field
                      as="select"
                      name="subcategory"
                      validate={schema}
                      label="Sub Category"
                      disabled={formik.values.category ? false : true}
                      options={subCategories}
                      handleCategoryChange={handleCategoryChange}
                      component={FieldSelectInput}
                    />
                  </div>
              
                </Col>
               
               
                 
                <Col sm={6}>
                  <div>
                    <label className="form-label">
                      <small>Upload Picture</small>
                    </label>
                    <div className="fv-row mb-4">
                      <div className="uploadBtn">
                        <div className="uploadIconText">
                          <p>Upload Pictures of Service</p>
                          <img src={attach} alt="attach" />
                        </div>
                        <input
                          type="file"
                          placeholder="Image"
                          accept="image/*"
                          // {...formik.getFieldProps('image')}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.image && formik.errors.image,
                            },
                            {
                              "is-valid":
                                formik.touched.image && !formik.errors.image,
                            }
                          )}
                          // value={formik.values.image}
                          onChange={(e: any) => {
                            handleFileChange(e);
                          }}
                        />
                      </div>
                      {/* <div className="uploadImage">
                        <img src={placeholderImg} alt="placeholderImg" />
                      </div> */}
                      {formik.touched.image && formik.errors.image && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.image}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {(file || formik.values.image) && (
                        <img
                          className="w-100 h-100 rounded-2"
                          src={file ? file: getImageUrl(formik.values.image)}
                          alt="UploadImage"
                        />
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="fv-row mb-4">
                    <Field
                      name="gender"
                      validate={schema}
                      required={true}
                      label="Select Gender"
                      options={genders}
                      handleChange={handleChange}
                      component={FieldCheckBox}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="fv-row mb-4">
                    <Field
                      name="description"
                      validate={disablesubCategory ? null : schema}
                      required={true}
                      label="Description"
                      options={subCategories}
                      component={FieldTextArea}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <div className="fv-row mb-4">
                    <Field
                      name="cost"
                      validate={schema}
                      required={true}
                      type="number"
                      label="Cost"
                      component={FieldInputText}
                    />
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="fv-row mb-2">
                    <Field
                      name="hours"
                      validate={schema}
                      type="number"
                      label="Hours"
                      component={FieldInputText}
                      placeholder="00"
                    />
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="fv-row mb-2">
                    <Field
                      name="minutes"
                      validate={schema}
                      type="number"
                      label="Minutes"
                      component={FieldInputText}
                      placeholder="00"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-items-center gap-5">
              <Button
                type="button"
                className="borderBtn btn-sm w-250"
                onClick={cancelButton}
              >
                Cancel
              </Button>
              <button
                className="blackBtn btn-sm w-250"
                type="submit"
                disabled={formik.isSubmitting && !formik.isValid}
              >{formik.values._id ? 'Update Service' : 'Create Service'} 
                {/* {!serviceState.loading && (
                  <span className="indicator-label">Save</span>
                )} */}
                {/* {formik.isValid && serviceState.loading && (
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
      </FormikProvider>
    </Modal>
  );
};
