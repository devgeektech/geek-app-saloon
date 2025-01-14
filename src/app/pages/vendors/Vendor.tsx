import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import coupon from "../../../_metronic/images/coupon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import dummyImg from "../../../_metronic/images/dummy.webp";
import {
  deleteVender,
  getSaloonById,
} from "../../services/_requests";
import Pagination from "../../components/common/pagination";
import React, { useEffect, useState } from "react";
import pencilEditIcon from "../../../_metronic/images/pencilEditIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import "./style.scss";
import DeleteModal from "../../components/common/modal/DeleteModal";
import "./style.scss";
import "../appointment/style.scss";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import NoDataFound from "../../components/common/noDataFound/NoDataFound";
import { useDebounce } from "../../../_metronic/helpers";
import {
  capitalizeFirstLetter,
  getImageUrl,
} from "../../utils/common";
import SaloonModal from "./addSaloonModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSaloonRequest,
  editSaloonRequest,
  getSaloonRequest,
  setSaloonId,
  setUpdatedSaloonId,
} from "../../redux/reducer/saloonSlice";
import { closeModalRequest } from "../../redux/reducer/modalSlice";
import { resetServiceForm } from "../../redux/reducer/serviceSlice";
import {
  ADD,
  EDIT,
  INVALID_PHONE_NUMBER,
  PHONE_REGEX,
} from "../../utils/const";
import { REQUIRED_FIELD } from "../../utils/ErrorMessages";
import { setRequestStatus } from "../../redux/reducer/helperSlice";

const ShopWrapper = () => {
  const dispatch = useDispatch();
  const { saloonList, loading, totalRecord, saloonId, updatedSaloonId } = useSelector(
    (state: any) => state.saloon
  );
  const {requestStatus} = useSelector(
    (state: any) => state.helper
  );
  const intl = useIntl();
  const [vendors, setVendors] = useState([]);
  const [lat, setLat] = useState(30.741482);
  const [lng, setLang] = useState(76.768066);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add");
  const [debounceVal, setDebounceVal] = useState("");
  const debounceValue = useDebounce(searchUser, 1000);
  
  useEffect(() => {
      dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser }));
  }, [skip, debounceVal]);

  const initialValues = {
    name: "",
    image: "",
    location: "",
    latitude: "",
    longitude: "",
    phone: "",
  };

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    location: Yup.string().required(REQUIRED_FIELD),
    latitude: Yup.number().required(REQUIRED_FIELD),
    longitude: Yup.number().required(REQUIRED_FIELD),
    phone: Yup.string()
      .matches(PHONE_REGEX, INVALID_PHONE_NUMBER)
      .required(REQUIRED_FIELD),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        let reqObj: any = {
          name: values?.name,
          loc: {
            type: "Point",
            coordinates: [values.latitude, values?.longitude],
          },
          address: {
            city: values?.location,
          },
          phone: values?.phone,
        };
        if (modalType == ADD) {
          dispatch(addSaloonRequest(reqObj));
        } else {
          reqObj["id"] = updatedSaloonId;
          dispatch(editSaloonRequest(reqObj));
        }
        setTimeout(()=>{
          dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser }));
        },1000)       
        setShow(false);
        dispatch(setRequestStatus(false))
        formik.resetForm();
      } catch (error: any) {
        setStatus(error.message);
        setSubmitting(false);
      }
    },
  });

  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
  };

  const deleteCloseModal = () => {
    setModalShow(false);
  };

  const paginitionClbk = (val?: any) => {
    let skip1 = (val - 1) * limit;
    setSkip(skip1);
  };

  const deleteSaloon: any = async (event: any) => {
    if (event === true) {
      await deleteVender(deleteUserId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("Saloon has been Deleted!");
          setModalShow(false);
          dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser }));
        }
      });
      setDeleteUserId("");
      setModalShow(false);
    }
  };

  const openSaloonModal = async (type: any, id: any) => {
    setShow(true);
    if (type == EDIT) {
      dispatch(setUpdatedSaloonId(id));
      await getSaloonById(id).then((res: any) => {
        if (res.data.responseCode === 200) {
          formik.setFieldValue("name", res.data.data.name);
          formik.setFieldValue("phone", res.data.data.phone);
          formik.setFieldValue("location", res.data.data.address.city);
          formik.setFieldValue("latitude", res.data.data.loc.coordinates[0]);
          formik.setFieldValue("longitude", res.data.data.loc.coordinates[1]);
        }
      });
    }
    setModalType(type);
  };

  useEffect(() => {
    setDebounceVal(searchUser);
  }, [debounceValue, saloonList]);

  const cancelButton = () => {
    dispatch(closeModalRequest({}));
    dispatch(resetServiceForm());
    dispatch(setUpdatedSaloonId(""));
    setShow(false);
    formik.resetForm();
  };

  useEffect(()=>{
    if(requestStatus){
      dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser }));
    }
  },[requestStatus])

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <div className="appointmentContent">
        <div className="title_text d-flex justify-content-between align-items-center">
          <div className="">
            <h2 className="page_title">
              <img src={coupon} alt="coupon" />
              Saloon
            </h2>
          </div>
          <button
            onClick={() => {
              openSaloonModal(ADD, "");
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
                onChange={(e) => setSearchUser(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <button>
                <img src={searchIcon} alt="searchIcon" />
              </button>
            </div>
          </div>
          <div className="tableWrapper mb-5">
            <Table responsive className="table table-bordered coupons">
              <thead>
                <tr>
                  <th>Saloon's Name</th>
                  <th>Image</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {saloonList &&
                  saloonList.length > 0 &&
                  saloonList.map((item: any, index) => (
                    <tr key={index}>
                      <td>{capitalizeFirstLetter(item?.name)}</td>
                      <td>
                        <img
                          className="profileImg"
                          src={
                            item?.photo ? getImageUrl(item?.photo) : dummyImg
                          }
                          alt=""
                        />
                      </td>

                      <td>{item?.phone}</td>
                      <td>{capitalizeFirstLetter(item?.address?.city)} </td>
                      <td>
                        <div className="d-flex">
                          <button className="editBtn">
                            <img
                              src={pencilEditIcon}
                              alt="pencilEditIcon"
                              onClick={() => openSaloonModal(EDIT, item._id)}
                            />
                          </button>
                          <button className="deleteBtn">
                            <img
                              src={deleteIcon}
                              className="cursor-pointer"
                              alt="deleteIcon"
                              onClick={() => deleteOpenModal(item._id)}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {saloonList.length === 0 && (
              <>
                <NoDataFound />
              </>
            )}
            <div className="select-all mt-4 d-flex align-items-center">
              <label className="d-flex align-items-center gap-2"></label>
            </div>
            {totalRecord > 10 && (
              <Pagination
                data={vendors}
                limit={limit}
                totalRecord={totalRecord}
                paginitionClbk={(e: any) => {
                  paginitionClbk(e);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <>
        {show && (
          <SaloonModal
            show={show}
            schema={serviceSchema}
            formik={formik}
            cancelButton={cancelButton}
            modalType={modalType}
          ></SaloonModal>
        )}
      </>

      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteSaloon(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />
    </>
  );
};

export { ShopWrapper };
