import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import DeleteModal from '../common/modal/deleteModal'
import { useDispatch, useSelector } from 'react-redux'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { getImageUrl } from '../../utils/common'
import { closeDeleteModal, deleteSubCategoryRequest, resetSubCategoryForm, setDeleteModal, setSelectedId, setSubCategoryForm } from '../../redux/reducer/subCategorySlice';
import DeleteIcon from '../common/Icons/DeleteIcon'

// Interface for Category
interface SubCategory {
  _id: string;
  name: string;
  image: string;
  categoryId: Category;
  categoryType: 'SUB' | 'MAIN';
  createdAt: string;
  createdBy: string;
  isActive: boolean;
  isDeleted: boolean;
}
interface Category {
  _id: string;
  name: string;
  photo: string;
}


export default function TableSubCategory() {
  const dispatch = useDispatch();
  const { subCategoryList, showDeleteModal, selectedId} = useSelector((state: any) => state.subcategory);


  const deleteItem = (event: Boolean) => {
    if (event && selectedId !== "") {
      dispatch(deleteSubCategoryRequest({ id: selectedId }));
      dispatch(resetSubCategoryForm());
    }
  }

  const editItem = (data: SubCategory) => {
    dispatch(setSubCategoryForm({
      id: data._id,
      categoryId: data.categoryId?._id,
      name: data.name,
      image: data.image
    }));
  }

  return (
    <div>
      <Table responsive className='table table-bordered'>
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Photo</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategoryList &&
            subCategoryList.length > 0 &&
            subCategoryList.map((subCat: any, index: number) => (
              <tr key={`subCat${index}`}>
                <td>{subCat?.name}</td>
                <td>
                  <img
                    src={subCat.image ? getImageUrl(subCat.image) : dummyImg}
                    className='user-img'
                    alt='img'
                  />
                </td>
                <td>{subCat?.categoryId?.name}</td>
                <td>
                  <div className='d-flex'>
                    <button className='editBtn' onClick={() => editItem(subCat)}>
                      <img src={pencilEditIcon} alt='pencilEditIcon' />
                    </button>
                    <button className='deleteBtn' onClick={() => {
                      dispatch(setDeleteModal());
                      dispatch(setSelectedId(subCat?._id));
                    }}>
                      <DeleteIcon />
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
            ))}
        </tbody>
      </Table>

      <DeleteModal
        deleteUserClbk={deleteItem}
        openModal={showDeleteModal}
        closeModal={() => dispatch(closeDeleteModal())}
      />

    </div>
  )
}
