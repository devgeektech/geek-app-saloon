import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import DeleteModal from '../common/modal/DeleteModal'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { closeDeleteModal, deleteCategoryRequest, getCategoryRequest, resetCategoryForm, setCategoryForm, setDeleteModal, setSelectedCategoryId } from '../../redux/reducer/categorySlice'
import dummyImg from '../../../_metronic/images/dummy.webp'
import { getImageUrl } from '../../utils/common'
import Pagination from '../common/pagination'
import { useEffect, useState } from 'react'
import ArrowRightIcon from '../common/Icons/ArrowRightIcon'
import NoDataFound from '../common/noDataFound/NoDataFound'
import { setRequestStatus } from '../../redux/reducer/helperSlice'
import { CATEGORY } from '../../utils/const'

export default function TableCategory() {
  const dispatch = useDispatch();
  const { categoryList, selectedCategoryId, showDeleteModal, totalRecord } = useSelector((state: any) => state.category);
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 10;
  const {requestStatus} = useSelector((state: any) => state.helper);
  const { selectedTab } = useSelector((state: any) => state.service)

  const deleteItem = (event: any) => {
    if (event && selectedCategoryId !== "") {
      dispatch(deleteCategoryRequest({ id: selectedCategoryId }));
      dispatch(resetCategoryForm());
      setPageNumber(1);
      // dispatch(getCategoryRequest({ skip: 0, limit }))
    }
  }

  const handleEdit = (data: any) => {
    dispatch(setCategoryForm({
       id: data._id,
      name: data.name,
      photo: data.photo,
      description: data.description
    }));
  }

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
    const skip = (pageNumber - 1) * limit;
    dispatch(getCategoryRequest({ skip, limit }))
  };

  useEffect(()=>{
    if(requestStatus && (selectedTab == CATEGORY)){
      dispatch(getCategoryRequest({ skip: 0, limit }))
      dispatch(setRequestStatus(false))
    }
  },[requestStatus])

  return (
    <>
      <Table responsive className='table table-bordered mb-5'>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Photo</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(categoryList &&
            categoryList.length > 0) ?
            (
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
                  </td>
                  <td>
                    <div className='d-flex'>
                      <button className='editBtn' onClick={() => handleEdit(listValue)}>
                        <img src={pencilEditIcon} alt='pencilEditIcon' />
                      </button>
                      <button className='deleteBtn' onClick={() => {
                        dispatch(setDeleteModal())
                        dispatch(setSelectedCategoryId(listValue?._id))
                      }}>
                        <img src={deleteIcon} alt='deleteIcon' />
                      </button>
                      <button className='deleteBtn'>
                        <ArrowRightIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
                    <td colSpan={6}>
                      <NoDataFound />
                      </td>  
                  </tr>
          )
          }
        </tbody>
      </Table>
      {totalRecord > 10 && (
        <Pagination
          data={categoryList}
          limit={limit}
          totalRecord={totalRecord}
          paginitionClbk={handlePageChange}
          currentPage={pageNumber}
        />
      )}
      <DeleteModal
        deleteUserClbk={deleteItem}
        openModal={showDeleteModal}
        closeModal={() => dispatch(closeDeleteModal())}
      />
     
    </>
  )
}
