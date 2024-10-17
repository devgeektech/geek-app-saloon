import { Field, FormikProvider } from "formik";
import {
  Button,
  Form,
  Col,
  Container,
  Modal,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import "./styles.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./leave.scss";
import FieldSelectInput from "../../components/common/inputs/FIeldSelectInput";
import { useSelector,useDispatch } from "react-redux";
import { getDefaultStaffRequest } from "../../redux/reducer/staffSlice";

const EditLeave = (props: any) => {
  const { show, cancelButton, categories, formik, schema, leaveType, staffList, defaultSlots } = props;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getDefaultStaffRequest({}));
  },[])

  const [dateState, setDateState] = useState({
    date: new Date(),
  });

  const [selectedLeaveType, setSelectedLeaveType] = useState('')
  
  const [customeSlotsDuration, setCustomSlotsDuration] = useState({
    start : '',
    end : ''
  })

  useEffect(()=>{
    formik.setFieldValue('date', moment(dateState.date).format('YYYY-MM-DD'))
  },[dateState])

  const handleChangeDate = (date, event) => {
    setDateState({ date:new Date(date)});
    formik.setFieldValue('date', moment(date).format('YYYY-MM-DD'))
  };

  const handleLeaveTypeChange = (e) => {
    setSelectedLeaveType(e.target.value)
    if(e.target.value != 'custom') {
      formik.setFieldValue('start', '');
      formik.setFieldValue('end', '');
      formik.setFieldValue('startIndex', -1)
      formik.setFieldValue('endIndex', -1)
    }

    formik.setFieldValue('leaveType', e.target.value);
  };

  const handleStartSlotChange = (e) => {
    setCustomSlotsDuration({...customeSlotsDuration, start: e.target.value})
    const index = defaultSlots.findIndex(item => item._id === e.target.value);
    console.log(defaultSlots,">> default")
    formik.setFieldValue('start', defaultSlots[index].start);
    formik.setFieldValue('startIndex', index);
  };

  const handleEndSlotChange = (e) => {
    setCustomSlotsDuration({...customeSlotsDuration, end: e.target.value})
    const index = defaultSlots.findIndex(item => item._id === e.target.value);
    formik.setFieldValue('end', defaultSlots[index].start);
    formik.setFieldValue('endIndex', index);
  };

  return (
    <Modal show={show} size="lg" onHide={cancelButton}>
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            console.log("onSubmit works")
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <Modal.Header>
            <Modal.Title>Select Time Slot</Modal.Title>
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
            <div className="apply-leave-form p-4">
              <Row>
                <Col md={8}>
                  <h4>Apply Leave</h4>
                </Col>
                <Col md={4}>
                <DatePicker
                    selected={dateState.date}
                    onChange={handleChangeDate}
                  />
                </Col>
              </Row>
       
              <Row>
                <Col md={6}>
                  <Field
                    as="select"
                    name="leaveType"
                    validate={schema}
                    label="Leave Type"
                    required={true}
                    options={leaveType}
                    handleCategoryChange={handleLeaveTypeChange}
                    component={FieldSelectInput}
                  />
                </Col>
                <Col md={6}>
                  {/* <Field
                    as="select"
                    name="staff"
                    validate={schema}
                    label="Staff"
                    required={true}
                    options={staffList}
                    handleCategoryChange={handleStaffChange}
                    component={FieldSelectInput}
                  /> */}
                </Col>  
              </Row>
              {selectedLeaveType == 'custom' && (<Row>
                <Col md={6}>
                  <Field
                    as="select"
                    name="start"
                    // validate={schema}
                    label="Start"
                    required={true}
                    options={defaultSlots}
                    handleCategoryChange={handleStartSlotChange}
                    component={FieldSelectInput}
                  />
                </Col>
                <Col md={6}>
                  <Field
                    as="select"
                    name="end"
                    // validate={schema}
                    label="End Slot"
                    required={true}
                    options={defaultSlots}
                    handleCategoryChange={handleEndSlotChange}
                    component={FieldSelectInput}
                  />
                </Col>
              </Row>)
              } 

              <div className="button-group mt-4">
                <Button variant="outline-secondary" className="me-3">
                  Cancel
                </Button>
                <Button type="submit" variant="dark">Apply</Button>
              </div>
            </div>
          </Modal.Body>

          {/* <Modal.Footer>
            <div className="d-flex align-items-center gap-5">
              <Button
                type="button"
                className="borderBtn btn-sm w-200"
                // onClick={cancelButton}
              >
                Cancel
              </Button>
              <button
                className="blackBtn btn-sm w-150"
                type="submit"
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                <span className="indicator-label">{false ? 'Update':'Add'}</span>
              </button>
            </div>
          </Modal.Footer>    */}
        </form>
      </FormikProvider>
    </Modal>
  );
};

export default EditLeave;
