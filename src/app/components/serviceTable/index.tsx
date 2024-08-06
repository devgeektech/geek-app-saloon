import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import ModalInner from '../../modals/deleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalRequest, openModalRequest } from '../../redux/reducer/modalSlice'
import { editServiceRequestData } from '../../redux/reducer/serviceSlice'
import { getImageUrl } from '../../utils/common'

export default function Servicetable(props: any) {
  const dispatch = useDispatch()
  const [services, setServices] = useState([])
  // const [modalShow, setModalShow] = useState(false)
  const { serviceList } = useSelector((state: any) => state.service)

  useEffect(() => {
    setServices(serviceList)
  }, [serviceList])

  const editService = (serviceObj: any) => {
    dispatch(openModalRequest())
    dispatch(editServiceRequestData({ ...serviceObj }))
  }

  const deleteOpenModal = () => {

    // setModalShow(true)
  }

  return (
    <>
      <Table responsive className='table table-bordered'>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Service Name</th>
            <th>Photo</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Cost</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services &&
            services.length > 0 &&
            services.map((service: any, index: number) => (
              <tr key={service._id}>
                {/* <td>
                  <input type='checkbox' />
                </td> */}
                {/* <td>{index + 1}</td> */}
                <td>12</td>
                <td>{service?.name ? service.name : ''}</td>
                <td>
                  <img
                    src={service.image ? getImageUrl(service.image) : dummyImg}

                    className='user-img'
                    alt='noimg'
                  />
                </td>
                <td>{service.category?.name && service.category.name}</td>
                <td>{service.subcategory?.name && service.subcategory.name}</td>
                <td>${service?.cost ? service.cost : 0}</td>
                <td>{service?.time ? service.time : 0} mins</td>
                <td>
                  <div className='d-flex'>
                    <button
                      onClick={() => {
                        editService(service)
                      }}
                      className='editBtn'
                    >
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn' onClick={() => deleteOpenModal()}>
                      <img src={deleteIcon} alt='deleteIcon' />
                    </button>
                    <button className='deleteBtn'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='13'
                        height='14'
                        viewBox='0 0 13 14'
                        fill='none'
                      >
                        {/* <path
                          d='M4 11.5L8 7.5L4 3.5'
                          stroke='#8D8D8D'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        /> */}
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* <ModalInner
      openModal={modalShow}
      closeModal={deleteCloseModal}
      /> */}
    </>
  )
}
