import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import appointmentBlackIcon from '../../../_metronic/images/appointmentBlackIcon.svg'
import greenLineIcon from '../../../_metronic/images/greenLineIcon.svg'
import redLineIcon from '../../../_metronic/images/redLineIcon.svg'
import chart from '../../../_metronic/images/chart.jpg'
import coupon from '../../../_metronic/images/coupon.svg'
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'
import deleteIcon from '../../../_metronic/images/deleteIcon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import { Dropdown, Tab, Table, Tabs } from 'react-bootstrap'
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
import { REQUIRED, SUCCESS } from '../../utils/const'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { addCoupon, commonFileUpload, deleteCoupon, updateCoupon } from '../../services/_requests'
import { addCouponSuccess, getCouponRequest, setCouponId, updateCouponSuccess } from '../../redux/reducer/couponSlice'
import { getCategoryRequest } from '../../redux/reducer/categorySlice'

const CouponsWrapper = () => {
  const intl = useIntl()
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { couponList, totalRecord, loading, couponId } = useSelector((state: any) => state.coupon);
  const { saloonId } = useSelector((state: any) => state.saloon);
  const categoriesState: [] = useSelector((state: any) => state.category.categoryList);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string | any>('Active');
  const limit = 10;
  const skip = (pageNumber - 1) * limit;

  const debounceSearch = useDebounce(searchValue, 1000);

  const initialValues = {
    offerName: '',
    status: 'Active',
    service: 'all',
    category: '',
    subcategory: '',
    discount: 0,
    appliesToAllServices: false,
  }

  const couponSchema = Yup.object().shape({
    offerName: Yup.string().required(REQUIRED),
    status: Yup.string().required(REQUIRED),
    service: Yup.string().required(REQUIRED),
    category: Yup.string().required(REQUIRED),
    subcategory: Yup.string().required(REQUIRED),
    appliesToAllServices: Yup.bool().required(REQUIRED),
    discount: Yup.number().min(0).max(100).required(REQUIRED),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: couponSchema,
    enableReinitialize: true, // important to reset form values when 'initialValues' change
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (!saloonId) {
          return toast.info("Select Saloon First!")
        }
        const data = { ...values, saloonId };
        if (editMode) {
          let res = await updateCoupon(couponId, data);
          if (res.status === 200) {
            dispatch(updateCouponSuccess(res.data));
          }
        } else {
          let res = await addCoupon(data);
          if (selectedTab == values.status) {
            console.log("object", res)
            dispatch(addCouponSuccess(res.data));
          }
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
    setEditMode(true);
    const { category, service, subcategory } = item;
    formik.setValues({ ...item, category: category?._id, service: service?._id, subcategory: subcategory?._id });
    dispatch(setCouponId(item?._id));
    setModalShow(true);
  };

  const closeCouponModal = () => {
    setModalShow(false);
    formik.resetForm();
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
          dispatch(getCouponRequest({ search: debounceSearch, skip, limit,status: selectedTab }));
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
                <ActiveTable coupons={couponList} deleteItem={deleteOpenModal} editItem={editCoupon} />
                <div className='select-all mt-4 d-flex align-items-center'>
                  <label className='d-flex align-items-center gap-2'>
                    <input type='checkbox'></input>select-all
                  </label>
                </div>
                {totalRecord > limit && (<Pagenation  limit={limit}
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
                <InActiveTable coupons={couponList} deleteItem={deleteOpenModal} editItem={editCoupon} />
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
