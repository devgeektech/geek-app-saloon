import { Field, FormikProvider } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import FieldInputText from "../../components/inputs/FieldInputText";
import FieldSelectInput from "../../components/inputs/FIeldSelectInput";
import attach from "../../../_metronic/assets/images/attach.svg";
import clsx from "clsx";
import placeholderImg from "../../../_metronic/assets/images/placeholderImg.jpg";
import FieldCheckBox from "../../components/inputs/FieldCheckBox";
import FieldTextArea from "../../components/inputs/FieldTextArea";

export const AddServiceModal = (props) => {
  const {
    formik,
    show,
    schema,
    categories,
    subCategories,
    handleFileChange,
    genders,
    cancelButton,
    file,
  } = props;

  return (
    <Modal className="addServicesModal" show={show}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Create A Service</Modal.Title>
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
                      component={FieldInputText}
                    />
                  </div>
                  <div className="fv-row mb-4">
                    <Field
                      as="select"
                      name="category"
                      validate={schema}
                      label="Category"
                      options={categories}
                      component={FieldSelectInput}
                    />
                  </div>
                  <div className="fv-row mb-4">
                    <Field
                      as="select"
                      name="subCategories"
                      validate={schema}
                      label="Sub Category"
                      options={subCategories}
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
                      <div className="uploadImage">
                        <img src={placeholderImg} alt="placeholderImg" />
                      </div>
                      {formik.touched.image && formik.errors.image && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.image}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      {file && (
                        <img
                          className="w-100 rounded-2"
                          src={file && file}
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
                      label="Select Gender"
                      options={genders}
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
                      validate={schema}
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
                      name="min"
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
              <Button className="borderBtn btn-sm w-250" onClick={cancelButton}>
                Cancel
              </Button>
              <button
                className="blackBtn btn-sm w-250"
                type="submit"
                id="kt_sign_in_submit"
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                {<span className="indicator-label">Add</span>}
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
      </FormikProvider>
    </Modal>
  );
};
