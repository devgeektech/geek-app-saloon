import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import coupon from "../../../_metronic/images/coupon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import { Table } from "react-bootstrap";
import Pagination from "../../components/common/pagination";
import pencilEditIcon from '../../../_metronic/images/pencilEditIcon.svg'

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import NoDataFound from "../../components/common/noDataFound/NoDataFound";
import BannerModal from "./addStaffModal";
import moment from "moment";
import dummyImg from "../../../_metronic/images/dummy.webp";
import { useDebounce } from "../../../_metronic/helpers";
import DeleteModal from "../../components/common/modal/DeleteModal";
import { getImageUrl } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { commonFileUpload, deleteBanner, deleteStaff } from "../../services/_requests";
import DeleteIcon from "../../components/common/Icons/DeleteIcon";
import { addBannerRequest, deleteBannerRequest, getBannerRequest, setBannerId } from "../../redux/reducer/bannerSlice";
import { REQUIRED, SUCCESS } from "../../utils/const";
import { addStaffRequest, getStaffRequest, setStaffId } from "../../redux/reducer/staffSlice";
import StaffModal from "./addStaffModal";

const StaffWrapper = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [file, setFile] = useState<File | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { staffList, totalRecord, loading, staffId } = useSelector((state: any) => state.staff);
  const { saloonId } = useSelector((state: any) => state.saloon);

  const limit = 10;
  const skip = (pageNumber - 1) * limit;

  const debounceSearch = useDebounce(searchValue, 1000);

  const initialValues = {
    name: '',
    image: file,
    gender: '',
    age: '',
    aboutUs: '',
    qualification: '',
  }

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED),
    image: Yup.mixed()
      .required(REQUIRED)
      .test('fileSize', 'File size is too large', (value: any) => {
        return !value || (value && value.size <= 2 * 1024 * 1024); // 2MB limit
      })
      .test('fileType', 'Unsupported file format', (value: any) => {
        return !value || ['image/jpeg', 'image/png'].includes(value.type);
      }),
    gender: Yup.string().required(REQUIRED),
    age: Yup.string().required(REQUIRED),
    aboutUs: Yup.string().required(REQUIRED),
    qualification: Yup.string().required(REQUIRED),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (file) {
          const imageUrl = await upload(file);
          const data = { ...values, image: imageUrl };
          data['saloonId'] = saloonId;
          dispatch(addStaffRequest(data));
          closeStaffModal();
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.responseMessage || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const upload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await commonFileUpload(formData);
      if (response.data.responseCode === 200) {
        return response.data.data.url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to upload image');
    }
  };

  const handleFileChange = (file: File) => {
    formik.setFieldValue("image", file);
    setFile(file);
  };

  const editStaff = (id: string) => {
    dispatch(getStaffRequest(id));
    setModalShow(true);
  };


  const closeStaffModal = () => {
    setModalShow(false);
    formik.resetForm();
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    dispatch(setStaffId(null))
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const deleteOpenModal = (id: string) => {
    setShowDeleteModal(true);
    dispatch(setStaffId(id))
  };


  const deleteUser: any = async (event: any) => {
    if (event === true) {
      await deleteStaff(staffId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success(SUCCESS);
          setShowDeleteModal(false);
          dispatch(getStaffRequest({ search: debounceSearch, skip, limit }));
        }
      });
      dispatch(setStaffId(null))
      setModalShow(false);
    }
  };

  useEffect(() => {
    dispatch(getStaffRequest({ search: debounceSearch, skip, limit }));
  }, [debounceSearch, skip, limit, dispatch, saloonId]);

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <div className="appointmentContent">
        <div className="title_text d-flex justify-content-between align-items-center">
          <div>
            <h2 className="page_title">
              <img src={coupon} alt="coupon" />
              Staff
            </h2>
          </div>
          <button onClick={() => setModalShow(true)} className="yellowBtn">
            Add
          </button>
        </div>
        <div className="tabWrapper">
          <div className="searchbar_filter d-flex justify-content-end mb-5">
            <div className="searchbar">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={handleSearchChange}
              />
              <button>
                <img src={searchIcon} alt="searchIcon" />
              </button>
            </div>
          </div>
          <div className="tableWrapper my-5">
            <Table responsive className="table table-bordered coupons">
              <thead>
                <tr>
                  <th>Sr no</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>About</th>
                  <th>Qualification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffList && staffList.length > 0 ? (
                  staffList.map((item: any, index: number) => (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{item?.name || 'N/A'}</td>
                      <td>
                        <img
                          className="profileImg"
                          src={item.image ? getImageUrl(item.image) : dummyImg}
                          alt=""
                        />
                      </td>
                      <td>{item?.gender || 'N/A'}</td>
                      <td>{item?.age || 'N/A'}</td>
                      <td>{item?.aboutUs || 'N/A'}</td>
                      <td>{item?.qualification || 'N/A'}</td>


                      <td>
                        <div className="d-flex">
                          <button className='editBtn' onClick={() => editStaff(item)}>
                            <img src={pencilEditIcon} alt='pencilEditIcon' />
                          </button>
                          <button onClick={() => deleteOpenModal(item._id)} className="deleteBtn">
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
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
      </div>
      {modalShow && (
        <StaffModal
          show={modalShow}
          schema={serviceSchema}
          file={file}
          formik={formik}
          cancelButton={closeStaffModal}
          handleFileChange={handleFileChange}
          gender={["Male", "Female", "Other"]}
        />
      )}

      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={showDeleteModal}
        closeModal={closeDeleteModal}
      />
    </>
  );
};

export { StaffWrapper };
