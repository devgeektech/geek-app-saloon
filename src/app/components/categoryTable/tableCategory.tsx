import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import ModalInner from '../../modals/deleteModal'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeDeleteModal, deleteCategoryRequest, getCategoryRequest, setDeleteModal, setSelectedCategoryId } from '../../redux/reducer/categorySlice'
import dummyImg from '../../../_metronic/images/dummy.webp'

export default function TableCategory() {
  const dispatch = useDispatch()
  const { categoryList, selectedCategoryId, showDeleteModal } = useSelector((state: any) => state.category);

  const deleteUser = (event: any) => {
    if(event){
      dispatch(deleteCategoryRequest({id: selectedCategoryId}))
    }
  }

  function getImageUrl(imageUrl) {
    const baseUploadPath = process.env.REACT_APP_IMAGE_URL;
    if (imageUrl.startsWith('upload')) {
      return baseUploadPath + imageUrl;
    } else {
      return imageUrl;
    }
  }

  return (
    <>
      <Table responsive className='table table-bordered'>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Photo</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList.length > 0 &&
            categoryList.map((listValue: any, index: number) => {
              return (
                <tr key={`cat${index}`}>
                  <td>{listValue?.name}</td>
                  <td>
                    <img
                      src={listValue.photo ? getImageUrl(listValue.photo) : dummyImg}
                      className='user-img'
                      alt='catimage'
                    />
                  </td>
                  <td className='active'>
                    Active
                    {/* <label className='switch'>
                      <input type='checkbox' />
                      <span className='slider round'></span>
                    </label> */}
                  </td>
                  <td>
                    <div className='d-flex'>
                      <button className='editBtn'>
                        <img src={pencilEditIcon} alt='pencilEditIcon' />
                      </button>
                      <button className='deleteBtn' onClick={() => {
                        dispatch(setDeleteModal())
                        dispatch(setSelectedCategoryId(listValue?._id))
                      }}>
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
                          <path
                            d='M4 11.5L8 7.5L4 3.5'
                            stroke='#8D8D8D'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      <ModalInner
        deleteUserClbk={deleteUser}
        openModal={showDeleteModal}
        closeModal={() => dispatch(closeDeleteModal())}
      />
    </>
  )
}
