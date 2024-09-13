import React from 'react'
import { Offcanvas } from 'react-bootstrap'

const SlotsDrawer = ({staff,slot,show,close}) => {
  const props={
    name: 'Staff Appointment',
    scroll: false,
    backdrop: true
  }
  return (
    <div>
      <Offcanvas show={show} onHide={close} placement="end" {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-capitalize'>
            {staff?.name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <h5>Slots</h5>

            {
                slot.times?.map((t,index)=>
                   <span key={index} className={t?.available?'p-2 badge badge-success m-1':'m-1 p-2 badge'}>{t?.time}</span>
                )
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default SlotsDrawer
