import React, { useEffect, useState } from 'react'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
import DeleteModal from '../common/modal/DeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { getImageUrl } from '../../utils/common'
import { closeDeleteModal, deleteSubCategoryRequest, getSubCategoryRequest, resetSubCategoryForm, setDeleteModal, setSelectedId, setSubCategoryForm } from '../../redux/reducer/subCategorySlice';
import DeleteIcon from '../common/Icons/DeleteIcon'
import Pagination from '../common/pagination'
import ArrowRightIcon from '../common/Icons/ArrowRightIcon'

// Interface for Category
interface SubCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
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
  const { subCategoryList, showDeleteModal, selectedId, totalRecord  } = useSelector((state: any) => state.subcategory);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const limit = 10;

  const deleteItem = (event: Boolean) => {
    if (event && selectedId !== "") {
      dispatch(deleteSubCategoryRequest({ id: selectedId }));
      dispatch(resetSubCategoryForm());
      setPageNumber(1);
      dispatch(getSubCategoryRequest({ search : '', skip: 0, limit }));
    }
  }

  const editItem = (data: SubCategory) => {
    dispatch(setSubCategoryForm({
      id: data._id,
      categoryId: data.categoryId?._id,
      name: data.name,
      image: data.image,
      description: data.description
    }));
  }

   const paginitionClbk = (pageNumber?: any) => {
    setPageNumber(pageNumber);
    const skip = (pageNumber - 1) * limit;
    dispatch(getSubCategoryRequest({ search : '', skip, limit }));
  };

  return (
    <div>
      <Table responsive className='table table-bordered mb-5'>
        <thead>
          <tr>
            {/* <th>Sr No</th> */}
            <th>Photo</th>
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
                {/* <td>{index + 1}</td> */}
                <td>
                  <img
                    src={subCat.image ? getImageUrl(subCat.image) : dummyImg}
                    className='user-img'
                    alt='img'
                  />
                </td>
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
                      <ArrowRightIcon/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {totalRecord > 10 && (
        <Pagination
          data={subCategoryList}
          limit={10}
          totalRecord={totalRecord}
          paginitionClbk={paginitionClbk}
          currentPage={pageNumber}
        />
      )}
      <DeleteModal
        deleteUserClbk={deleteItem}
        openModal={showDeleteModal}
        closeModal={() => dispatch(closeDeleteModal())}
      />

    </div>
  )
}
