import { Field, FormikProvider } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import FieldInputText from "../../components/common/inputs/FieldInputText";
import { useEffect } from "react";
import "react-image-crop/src/ReactCrop.scss";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../redux/reducer/saloonSlice";
import { REQUIRED_FIELD } from "../../utils/ErrorMessages";

const SaloonModal = (props: any) => {
  const { formik, show, schema, cancelButton, modalType } = props;
  const { address } = useSelector((state: any) => state.saloon);
  const dispatch = useDispatch();
console.log('formik--->',formik.errors);

  const handleSelect = (address) => {
    formik.setFieldValue("location", address);
    dispatch(setAddress(address))
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        formik.setFieldValue("latitude", latLng?.lat);
        formik.setFieldValue("longitude", latLng?.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  useEffect(() => {
    dispatch(setAddress(formik.values.location))
  }, [formik.values]);

  return (
    <Modal show={show} size="lg" onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>
              {modalType === "Add" ? "Add Saloon" : "Update Saloon"}
            </Modal.Title>
            <button
              type="button"
              className="bg-transparent border-0"
              onClick={cancelButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M7.9193 9.49993L0.327318 17.0919C-0.109199 17.5285 -0.109013 18.2361 0.327318 18.6726C0.763836 19.1091 1.47148 19.1091 1.90798 18.6726L9.49997 11.0806L17.092 18.6726C17.5285 19.1091 18.2361 19.1091 18.6726 18.6726C19.1091 18.2361 19.1091 17.5284 18.6726 17.0919L11.0806 9.49993L18.6726 1.90792C19.1089 1.4714 19.1089 0.763754 18.6726 0.32725C18.2361 -0.109081 17.5285 -0.109081 17.092 0.32725L9.49997 7.91926L1.90798 0.32725C1.47147 -0.109081 0.763821 -0.109081 0.327318 0.32725C-0.109013 0.763769 -0.109013 1.47142 0.327318 1.90792L7.9193 9.49993Z"
                  fill="#778CA2"
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Row>
                <Col sm={12}>
                  <Field
                    name="name"
                    validate={schema}
                    label="Name"
                    component={FieldInputText}
                    placeholder="Saloon Name"
                  />
                </Col>

                <Col sm={12}>
                  <PlacesAutocomplete
                    value={address}
                    onChange={(value) => {
                      dispatch(setAddress(value)); 
                    }}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div className="mb-3 flex items-center text-base relative">
                        <label className="form-label">Address</label>
                        <input
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input form-control",
                          })}
                        />
                        {
                          suggestions && suggestions.length > 0 &&
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded-b-md z-10">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = 'px-4 py-2 cursor-pointer hover:bg-gray-100';
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#fafafa",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                         }
                      </div>
                    )}
                  </PlacesAutocomplete>
                  {formik.touched?.location && formik.errors?.location && <span className="error">{REQUIRED_FIELD}</span>}
                </Col>
                <Col sm={12}>
                  <Field
                    type="number"
                    name="phone"
                    label="Phone"
                    component={FieldInputText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue("phone", e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-items-center gap-5">
              <Button
                type="button"
                className="borderBtn btn-sm w-200"
                onClick={cancelButton}
              >
                Cancel
              </Button>
              <button
                className="blackBtn btn-sm w-150"
                type="submit"
                disabled={formik.isSubmitting && formik.isValid}
              >
                {modalType === "Add" ? "Add" : "Update"}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default SaloonModal;
