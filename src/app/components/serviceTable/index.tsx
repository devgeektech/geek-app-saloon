import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import DeleteModal from '../common/modal/DeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalRequest, openModalRequest } from '../../redux/reducer/modalSlice'
import { deleteServiceRequest, editServiceRequestData, getServiceRequest, setServiceForm } from '../../redux/reducer/serviceSlice'
import { capitalizeFirstLetter, getImageUrl } from '../../utils/common'
import Pagination from '../common/pagination'

export default function Servicetable(props: any) {

  const dispatch = useDispatch()
  const { serviceList, totalRecord } = useSelector((state: any) => state.service)
  const [id, setId] = useState<string>('')
  const [modalShow, setModalShow] = useState<Boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const limit = 10;


  const editService = (serviceObj: any) => {
    dispatch(openModalRequest())
    dispatch(setServiceForm({
      ...serviceObj,
      category: serviceObj?.category?._id,
      subcategory: serviceObj?.subcategory?._id,
    }));
    // dispatch(editServiceRequestData({ ...serviceObj }))
  } 

  const openModal = (id: string) => {
    
    setModalShow(true);
    setId(id);
  }

  const deleteItem = (event: Boolean) => {
    if (event && id !== '') {
      dispatch(deleteServiceRequest({ id: id }));
      setId('');
      setModalShow(false);
      setPageNumber(1);
       
      dispatch(getServiceRequest({ skip: 0, limit }))
    }
  }

  const handlePageChange = (pageNumber: any) => {
    setPageNumber(pageNumber);
    const skip = (pageNumber - 1) * limit;
    dispatch(getServiceRequest({ skip, limit }));
  }

  const convertTime = (hours:any, minutes:any) => {
    const totalMinutes = Number(minutes) + Number(hours) * 60;
  
    if (isNaN(totalMinutes) || totalMinutes < 0) {
      return '0 hours 0 mins';
    }
  
    const calculatedHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
  
    return `${calculatedHours} hours ${remainingMinutes} mins`;
  };
  

  return (
    <>
      <Table responsive className='table table-bordered mb-5'>
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
          {serviceList &&
            serviceList.length > 0 &&
            serviceList.map((service: any, index: number) => (
              <tr key={service._id}>
                <td>{(pageNumber - 1) * limit + index + 1}</td>
                {/* <td>{service?.name ? service.name : 'N/A'}</td> */}
                <td>{capitalizeFirstLetter(service?.name ? service.name : 'N/A')}</td>
                <td>
                  <img
                    src={service.image ? getImageUrl(service.image) : dummyImg}

                    className='user-img'
                    alt='noimg'
                  />
                </td>
                <td>{capitalizeFirstLetter(service.category?.name ? service.category.name : 'N/A')}</td>
                <td>{capitalizeFirstLetter(service.subcategory?.name ? service.subcategory.name : 'N/A')}</td>
               <td>${service?.cost ? service.cost : 0}</td>
        <td>
        <td>{convertTime(service?.hours, service?.minutes)}</td>

        </td>

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
                    <button className='deleteBtn' onClick={() => openModal(service._id)}>
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
      {totalRecord > 10 && (
        <Pagination
          limit={limit}
          totalRecord={totalRecord}
          paginitionClbk={handlePageChange}
          currentPage={pageNumber}
        />
      )}
      <DeleteModal
        deleteUserClbk={deleteItem}
        show={modalShow}
        closeModal={() => setModalShow(false)}
      />

    </>
  )
}
