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
import dummyImg from "../../../_metronic/images/dummy.webp";
import { useDebounce } from "../../../_metronic/helpers";
import DeleteModal from "../../components/common/modal/DeleteModal";
import { capitalizeFirstLetter, getImageUrl } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { addStaff, commonFileUpload, deleteStaff, getStaffSlots, updateStaff, updateStaffStatus } from "../../services/_requests";
import DeleteIcon from "../../components/common/Icons/DeleteIcon";
import { addStaffSuccess, getStaffRequest, setStaffId, updateLeaveStaffRequest, updateStaffSuccess } from "../../redux/reducer/staffSlice";
import StaffModal from "./addStaffModal";
import { REQUIRED_FIELD } from "../../utils/ErrorMessages";
import SlotsDrawer from "./slotsDrawer";
import EditAppointment from "./editAppointmentModal";
import EditLeave from "./editLeaveModal";

const StaffWrapper = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [file, setFile] = useState<File | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [editAppointmentModalShow, setEditAppointmentModalShow] = useState<boolean>(false);
  const [editLeaveModalShow, setEditLeaveModalShow] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<any>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  let { staffList, totalRecord, loading, staffId, staffSlots } = useSelector((state: any) => state.staff);
  const { saloonId } = useSelector((state: any) => state.saloon);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');
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

  const initialLeaveValues = {
    leaveType: '',
    start: '',
    end:'',
    startIndex: -1,
    endIndex: -1,
    date: ''
  }

  const LeavesEnums = [
    { value: "full", label: "Full Day" },
    { value: "first", label: "First Half" },
    { value: "second", label: "Second Half" },
    { value: "custom", label: "Custom"}
  ];

  if(staffSlots && staffSlots.length > 0){
    staffSlots = staffSlots.map(item => ({
      ...item,
      label: item.start,
      name: item.start,
      _id: item.start
    }));
  }
  
  const staffSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    image: Yup.mixed(),
    gender: Yup.string().required(REQUIRED_FIELD),
    age: Yup.string().required(REQUIRED_FIELD),
    aboutUs: Yup.string().required(REQUIRED_FIELD),
    qualification: Yup.string().required(REQUIRED_FIELD),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: staffSchema,
    // enableReinitialize: true, // important to reset form values when 'initialValues' change
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (!saloonId) {
          return toast.info("Select Saloon First!")
        }
        let imageUrl;
        if (file) {
          imageUrl = await upload(file);
        }

        const data = { ...values, image: imageUrl, saloonId };
        if (editMode) {
          let res = await updateStaff(staffId, data);
          if (res.status === 200) {
            dispatch(updateStaffSuccess(res.data));
          }
        } else {
          console.log('ADD STAFF',data);
          let res = await addStaff(data);
          dispatch(addStaffSuccess(res.data));
          dispatch(getStaffRequest({ search: debounceSearch, skip, limit }));
        }
        closeStaffModal();
        setEditMode(false)
      } catch (error: any) {
        console.error(error);
        toast.error(error.responseMessage || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const leaveSchema = Yup.object().shape({
    leaveType: Yup.string().required(REQUIRED_FIELD),
    start: Yup.string().optional(),
    end: Yup.string().optional(),
    startIndex: Yup.number().optional(),
    endIndex: Yup.number().optional(),
    date: Yup.string().optional()
  });

  const leaveFormik: any = useFormik({
    initialValues: initialLeaveValues,
    enableReinitialize: true,
    validationSchema: leaveSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
       if(values.leaveType == '' && selectedStaffId == '') return
        if(values.leaveType == 'custom' && values.start != '' && values.end != '' && values.startIndex >= 0 && values.endIndex >= 0 ){
        let payload:any = {
          date: values.date,
          staff: selectedStaffId,
          type: values.leaveType,
          start: values.startIndex,
          end: values.endIndex,
        }
        console.log(payload, " payload >>>>")          
          dispatch(updateLeaveStaffRequest(payload));
        }
        else {
          let payload:any = {
            date: values.date,
            staff: selectedStaffId,
            type: values.leaveType,
          }
          dispatch(updateLeaveStaffRequest(payload));
        }
      }
      catch (error) {
        console.error(error)
      }
      finally {
        console.log(">>>> Formik on Finally >>>>")

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

  const editStaff = (item: any) => {
    setEditMode(true);
    formik.setValues({
      ...item,
      image: item?.image ? getImageUrl(item.image) : null,
    });
    // formik.setValues(item);
    dispatch(setStaffId(item?._id));
    setModalShow(true);
  };

  const closeStaffModal = () => {
    setModalShow(false);
    formik.resetForm();
  };

  const closeEditAppointment = () => {
    setEditAppointmentModalShow(false);
  }

  const closeEditLeave = () => {
    setEditLeaveModalShow(false);
  }

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


  const deleteSTaff: any = async (event: any) => {
    if (event === true) {
      await deleteStaff(staffId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("Staff has been Deleted!");
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

  const handleToggleChange = async (id: string, onLeave: boolean) => {
    try {
      const updatedStaff = { onLeave: !onLeave };
      const res = await updateStaffStatus(id, updatedStaff);
      if (res.status === 200) {
        dispatch(getStaffRequest({ search: debounceSearch, skip, limit }));
        const message = updatedStaff.onLeave ? "Staff is on leave" : "Staff is Available";
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  const openSlot=async(sf:any)=>{
      const slot= (await getStaffSlots(sf?._id)).data||[];
      setSelectedStaff({
        staff: sf,
        slot
      });
  }

  console.log('staffList--->',staffList)

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
          <button
            onClick={() => {
              setModalShow(true);
              dispatch(setStaffId(null));
            }}
            className="yellowBtn"
          >
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
                  <th>About us</th>
                  <th>Qualification</th>
                  {/* <th>Leave Status</th> */}
                  <th>Leave</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffList && staffList.length > 0 ? (
                  staffList.map((item: any, index: number) => (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{capitalizeFirstLetter(item?.name || "N/A")}</td>
                      <td>
                        <img
                          className="profileImg"
                          src={
                            item && item.image
                              ? getImageUrl(item.image)
                              : dummyImg
                          }
                          alt=""
                        />
                      </td>
                      <td>{item?.gender || "N/A"}</td>
                      <td>{item?.age || "N/A"}</td>
                      <td>{capitalizeFirstLetter(item?.aboutUs || "N/A")}</td>
                      <td>
                        {capitalizeFirstLetter(item?.qualification || "N/A")}
                      </td>
                      {/* <td className={item?.onLeave ? "inactive" : "active"}>
                        <label
                          className="switch"
                          title={item?.onLeave ? "On Leave" : ""}
                        >
                          <input
                            type="checkbox"
                            checked={item?.onLeave}
                            onChange={() =>
                              handleToggleChange(item._id, item?.onLeave)
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </td> */}
                      <td>
                      <button
                            className="editBtn"
                            onClick={() => {setEditLeaveModalShow(true); setSelectedStaffId(item._id)}}
                          >
                            <img src={pencilEditIcon} alt="pencilEditIcon" />
                          </button>
                      </td>        

                      <td>
                        <div className="d-flex">
                          {/* <button
                            title="Slots"
                            className="editBtn"
                            onClick={() => setEditAppointmentModalShow(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-clock-history"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                          </button> */}
                          <button
                            className="editBtn"
                            onClick={() => editStaff(item)}
                          >
                            <img src={pencilEditIcon} alt="pencilEditIcon" />
                          </button>
                          <button
                            onClick={() => deleteOpenModal(item._id)}
                            className="deleteBtn"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12}>
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
          schema={staffSchema}
          file={file}
          formik={formik}
          cancelButton={closeStaffModal}
          handleFileChange={handleFileChange}
          gender={["Male", "Female", "Other"]}
        />
      )}

      {editAppointmentModalShow && (
        <EditAppointment 
         show = {editAppointmentModalShow}
         cancelButton={closeEditAppointment}> 
        </EditAppointment>
      )}

      {editLeaveModalShow && (
        <EditLeave
         show = {editLeaveModalShow}
         cancelButton={closeEditLeave}
         schema={leaveSchema}
         formik={leaveFormik}
         leaveType = {LeavesEnums}
         staffList = {staffList}
         defaultSlots = {staffSlots}
         > 
        </EditLeave>
      )}

      {selectedStaff && (
        <SlotsDrawer
          show={true}
          staff={selectedStaff?.staff}
          slot={selectedStaff?.slot}
          close={() => setSelectedStaff(undefined)}
        />
      )}

      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteSTaff(e);
        }}
        openModal={showDeleteModal}
        closeModal={closeDeleteModal}
      />
    </>
  );
};

export { StaffWrapper };
