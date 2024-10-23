import { Field } from 'formik';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import "./styles.scss";
import { useState } from 'react';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const timeSlots = [
    { time: '9:00', status: 'Available' },
    { time: '9:30', status: 'Leave' },
    { time: '10:00', status: 'Available' },
    { time: '10:30', status: 'Cancelled by user' },
    { time: '11:00', status: 'Cancelled by Admin' },
    { time: '11:30', status: 'Available' },
    { time: '12:00', status: 'Leave' },
    { time: '12:30', status: 'Leave' },
    { time: '1:00', status: 'Leave' },
    { time: '1:30', status: 'Cancelled by user' },
    { time: '2:00', status: 'Available' },
    { time: '2:30', status: 'Leave' },
  ];

const EditAppointment = (props: any) => {
    const {
        show,
        cancelButton,
    } = props;

    const [appointments, setAppointments] = useState([])

    const [dateState , setDateState] = useState({
        date: new Date()
    })
    
    const handleChangeDate = (date, event) => {
        setDateState({date: new Date(date)})
    }

    return (
      <Modal show={show} size="lg" onHide={cancelButton}>
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
          <div>
            <Container>
              <Row>
                <Col className="mb-3">
                  <DatePicker
                    selected={dateState.date}
                    onChange={handleChangeDate}
                  />
                </Col>
              </Row>
              <Row>
                {timeSlots.map((slot, index) => (
                  <Col key={index} xs={4} md={2} className="mb-3">
                    <div
                      className={`time-slot ${
                        slot.status === "Available" ? "available" : ""
                      } ${
                        slot.status.includes("Cancelled") ? "cancelled" : ""
                      }`}
                    >
                      <div className="time-header d-flex justify-content-between">
                        <span>{slot.time}</span>
                        <FaEdit className="edit-icon" />
                      </div>
                      <div className="status">{slot.status}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
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
      </Modal>
    );
}

export default EditAppointment;