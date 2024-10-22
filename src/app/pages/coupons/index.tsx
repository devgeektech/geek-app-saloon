import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import { Dropdown, Tab, Tabs } from 'react-bootstrap'
import ActiveTable from '../../components/couponTable'
import InActiveTable from '../../components/couponTable/inActive'
import Pagenation from '../../components/common/pagination'
import CouponModal from './couponModal'
import DeleteModal from '../../components/common/modal/DeleteModal'
import Pagination from '../../components/common/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../_metronic/helpers'
import * as Yup from "yup";
import { SUCCESS } from '../../utils/const'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { deleteCoupon, updateCouponStatus } from '../../services/_requests'
import { addCouponRequest, getCouponRequest, setCouponId, updateCouponRequest } from '../../redux/reducer/couponSlice'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'
import { REQUIRED_FIELD } from '../../utils/ErrorMessages'
import { setRequestStatus } from '../../redux/reducer/helperSlice'
import { setSelectedSaloon } from '../../redux/reducer/saloonSlice'

const CouponsWrapper = () => {
  const intl = useIntl()
  const dispatch: any = useDispatch();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { couponList, totalRecord, loading, couponId } = useSelector((state: any) => state.coupon);
  const { saloonId, saloonSelectArr } = useSelector((state: any) => state.saloon);
  const categoriesState: [] = useSelector((state: any) => state.category.categoryList);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string | any>('Active');
  const limit = 10;
  const skip = (pageNumber - 1) * limit;
  const { requestStatus } = useSelector((state: any) => state.helper);
  const debounceSearch = useDebounce(searchValue, 1000);

  const initialValues = {
    offerName: '',
    status: 'Active',
    service: '',
    discount: null,
    appliesToAllServices: false,
    offerStart: '',
    offerClose: '',
    saloon: []
  }

  const couponSchema = Yup.object().shape({
    offerName: Yup.string().required(REQUIRED_FIELD),
    status: Yup.string().required(REQUIRED_FIELD),
    service: Yup.string().optional(),
    saloon: Yup.array().required(REQUIRED_FIELD),
    appliesToAllServices: Yup.bool().required(REQUIRED_FIELD),
    discount: Yup.number().min(0).max(100).required(REQUIRED_FIELD),
    offerStart: Yup.string().required(REQUIRED_FIELD),
    offerClose: Yup.string().required(REQUIRED_FIELD),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: couponSchema,
    // enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if(values?.service != ''){
          values['offerType'] = 'service'
        }
        if(values?.service == ''){
          values['offerType'] = 'saloon'
        }
        if (editMode) {
          const data: any = { ...values };
          data['couponId'] = couponId;
          let res = await dispatch(updateCouponRequest(data))
        } else {
          let res = await dispatch(addCouponRequest(values))
        }
        closeCouponModal();
        setEditMode(false)
      } catch (error: any) {
        console.error(error);
        toast.error(error.responseMessage || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const editCoupon = (item: any) => {
    console.log('item', item)
    setEditMode(true);
    const { discount, service, offerClose, offerStart, status, offerName, saloon } = item;
    formik.setFieldValue("status", status);
    formik.setFieldValue("discount", discount);
    formik.setFieldValue("offerStart", offerStart);
    formik.setFieldValue("offerClose", offerClose);
    formik.setFieldValue("service", service);
    formik.setFieldValue("offerName", offerName);
    formik.setFieldValue("saloon", saloon);
    if (saloon) {
      let defaultSelectedOptions = saloonSelectArr.filter(option =>
        saloon.includes(option.value)
      );
      dispatch(setSelectedSaloon(defaultSelectedOptions));
      console.log('defaultSelectedOptions-->', defaultSelectedOptions)
    }
    dispatch(setCouponId(item?._id));
    setModalShow(true);
  };

  const closeCouponModal = () => {
    setModalShow(false);
    setEditMode(false);
    formik.resetForm();
    dispatch(setSelectedSaloon([]));
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    dispatch(setCouponId(null))
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const deleteOpenModal = (id: string) => {
    setShowDeleteModal(true);
    dispatch(setCouponId(id))
  };


  const deleteCoup: any = async (event: any) => {
    if (event === true) {
      await deleteCoupon(couponId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success(SUCCESS);
          setShowDeleteModal(false);
          dispatch(getCouponRequest({ search: debounceSearch, skip, limit, status: selectedTab }));
        }
      });
      dispatch(setCouponId(null))
      setModalShow(false);
    }
  };

  useEffect(() => {
    dispatch(getCouponRequest({ search: debounceSearch, skip, limit, status: selectedTab }));
    dispatch(getCategoryRequest({ search: searchValue, skip, limit }));
  }, [debounceSearch, skip, limit, dispatch, saloonId, selectedTab]);

  const handleToggleChange = async (id: string, status: string) => {
    try {
      const updatedStaff = { status };
      const res = await updateCouponStatus(id, updatedStaff);
      if (res.status === 200) {
        dispatch(getCouponRequest({ search: debounceSearch, skip, limit, status: selectedTab }));
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };


  useEffect(() => {
    if (requestStatus) {
      dispatch(getCouponRequest({ search: debounceSearch, skip, limit, status: selectedTab }));
      dispatch(setRequestStatus(false))
    }
  }, [requestStatus])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div className='appointmentContent'>
        <div className='title_text d-flex justify-content-between align-items-center'>
          <div className=''>
            <h2 className='page_title'>
              <img src={coupon} alt='coupon' />
              Coupons
            </h2>
            <p>Coupon management to attract and reward customers</p>
          </div>
          <button className='yellowBtn' onClick={() => {
            setModalShow(true);
            dispatch(setCouponId(null));
          }}>Add</button>
        </div>
        <div className='tabWrapper'>
          <p className='viewList'>viewing {limit} of {totalRecord}  of {pageNumber}</p>
          <Tabs defaultActiveKey='Active' onSelect={(e) => setSelectedTab(e)} id='uncontrolled-tab-example'>
            <Tab eventKey='Active' title='Active' >
              <div className='searchbar_filter d-flex justify-content-end mb-5'>
                <div className='searchbar'>
                  <input type='text' onChange={handleSearchChange} className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='filterDropdown'
                      variant='success'
                      id='dropdown-basic'
                    >
                      Fillter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className='tableWrapper mb-5'>
                <ActiveTable coupons={couponList} deleteItem={deleteOpenModal} handleToggleChange={handleToggleChange} editItem={editCoupon} />
                {/* <div className='select-all mt-4 d-flex align-items-center'>
                  <label className='d-flex align-items-center gap-2'>
                    <input type='checkbox'></input>select-all
                  </label>
                </div> */}
                {totalRecord > limit && (<Pagenation limit={limit}
                  totalRecord={totalRecord}
                  paginitionClbk={handlePageChange}
                  currentPage={pageNumber} />)}
              </div>
            </Tab>
            <Tab eventKey='InActive' title='Inactive' >
              <div className='searchbar_filter d-flex justify-content-end mb-5'>
                <div className='searchbar'>
                  <input type='text' onChange={handleSearchChange} className='form-control' placeholder='Search...' />
                  <button>
                    <img src={searchIcon} alt='searchIcon' />
                  </button>
                </div>
                <div className='filterWrapper'>
                  <Dropdown>
                    <Dropdown.Toggle
                      className='filterDropdown'
                      variant='success'
                      id='dropdown-basic'
                    >
                      Fillter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className='tableWrapper mb-5'>
                <InActiveTable coupons={couponList} deleteItem={deleteOpenModal} editItem={editCoupon} handleToggleChange={handleToggleChange} />
                <div className='select-all mt-4 d-flex align-items-center'>
                  <label className='d-flex align-items-center gap-2'>
                    <input type='checkbox'></input>select-all
                  </label>
                </div>
                {totalRecord > limit && (
                  <Pagination
                    limit={limit}
                    totalRecord={totalRecord}
                    paginitionClbk={handlePageChange}
                    currentPage={pageNumber}
                  />
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      {modalShow && (
        <CouponModal
          show={modalShow}
          schema={couponSchema}
          formik={formik}
          categories={categoriesState}
          cancelButton={closeCouponModal}
        />
      )}

      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteCoup(e);
        }}
        openModal={showDeleteModal}
        closeModal={closeDeleteModal}
      />
    </>
  )
}

export { CouponsWrapper }
