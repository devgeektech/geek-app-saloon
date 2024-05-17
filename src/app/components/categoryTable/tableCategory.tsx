import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import ModalInner from '../../modals/deleteModal'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'

export default function TableCategory() {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [categories, setCategories] = useState([])
  const { categoryList } = useSelector((state: any) => state.category);


  useEffect(() => {
    setCategories(categoryList)
  }, [categoryList])


  const deleteOpenModal = () => {

    setModalShow(true)
  }

  const deleteCloseModal = () => {

    setModalShow(false)
  }

  const deleteUser = (event: any) => { }

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
          {categories &&
            categories.length > 0 &&
            categories.map((listValue: any, index: number) => {
              return (
                <tr key={`cat${index}`}>
                  <td>{listValue?.name}</td>
                  <td>
                    <img
                      src={listValue.photo ? `http://localhost:3000/${listValue.photo}` : pencilEditIcon}
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
        deleteUserClbk={(e: any) => {
          deleteUser(e)
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />
    </>
  )
}
