import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import coupon from "../../../_metronic/images/coupon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Pagination from "../../components/pagenation";
import { useEffect, useState } from "react";
import { deleteBanner, getBanner, getBanners } from "../../services/_requests";
import pencilEditIcon from "../../../_metronic/images/pencilEditIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { toAbsoluteUrl } from "../../../_metronic/helpers";
import clsx from "clsx";
import { addBanner, commonFileUpload } from "../../services/_requests";
import "./styles.scss"
// import dummyImage from "../../../_metronic/images/dummy.webp"
import ModalInner from "../../modals/deleteModal";
import { toast } from "react-toastify";
import NoDataFound from "../../components/common/NoDataFound";
import BannerModal from "./addBannerModal";
import { closeModalRequest  ,openModalRequest,
} from "../../redux/reducer/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { getServiceRequest, serviceRequest } from "../../redux/reducer/serviceSlice";

const BannerWrapper = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState<any>(null);
  const [show, setShow] = useState(true)
  const [modalShow, setModalShow] = useState(false);
  const intl = useIntl();
  const [deleteUserId, setDeleteUserId] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    getBannersList();
  }, []);

  const initialValues = {
    name: '',
    image: '',
    type: '',
  }

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      addBanner(values).then((res: any) => {
        closeBannerModal();
        getBannersList();
        formik.resetForm();
        setTimeout(() => {
          setFile(null);
        }, 1000);
      }).catch((error) => {
        toast.error(error.response.data.responseMessage);
      });
    },
  });




  const getBannersList = async () => {
    await getBanners(search, skip, limit).then((res: any) => {
      setBanners(res.data?.data);
    });
  }

  const handleFileChange = async (e) => {
    if (e.target?.files && e.target?.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]))
      const formData = new FormData()
      formData.append('image', e.target?.files[0])
      await commonFileUpload(formData).then((res: any) => {
        if (res.data.responseCode === 200) {
          formik.setFieldValue('image', res.data.data.url)
        }
      })
    }
  }

  const tags = ["TOP", "MIDDLE",'BOTTOM'];
  const cancelButton = () => {
    setShow(false); 
    setModalShow(false)
  };



  const editBanner = async (id: any) => {
    await getBanner(id).then((res) => {
      const { name, image, type } = res.data.data;
      formik.setValues({ name, image, type });
      setFile(`${process.env.REACT_APP_IMAGE_URL}${image}`)
      addBannerModal()
    }).catch((error) => { console.log(error) })

  }

  const getImageUrl = (imageUrl) => {
    const baseUploadPath = process.env.REACT_APP_IMAGE_URL;
    if (imageUrl.startsWith('upload')) {
      return baseUploadPath + imageUrl;
    } else {
      return imageUrl;
    }
  }

  const deleteUser: any = async (event: any) => {
    if (event === true) {
      await deleteBanner(deleteUserId)
        .then((res: any) => {
          getBanners(search, skip, limit)
          toast.success("Banner Deleted Successfully");
          setModalShow(false);
          getBannersList();
        }).catch((err) => {
          console.log(err)
        })
    }
  };

  // Delete modal dialog
  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
    setFile(null)
  };

  const deleteCloseModal = () => {
    setModalShow(false);
  };

  const addBannerModal = () => {
    setShow(true); 
    setModalShow(true)
  
  };

  const closeBannerModal = () => {
    setShow(false);
    formik.resetForm();
    setTimeout(() => {
      setFile(null)
    }, 500);
  };

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
              Banners
            </h2>
          </div>
          <button onClick={addBannerModal} className="yellowBtn">
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
              />
              <button>
                <img src={searchIcon} alt="searchIcon" />
              </button>
            </div>
            {/* <div className='filterWrapper'>
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
            </div> */}
          </div>
          <div className="tableWrapper mb-5">
            <>
              <Table responsive className="table table-bordered coupons">
                <thead>
                  <tr>
                    {/* <th>
              <input type='checkbox' />
            </th> */}
                    {/* <th>Sr no</th> */}
                    <th>Title</th>
                    <th>Image</th>

                    <th>Created At</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {banners &&
                    banners.length > 0 &&
                    banners.map((item: any, index) => (
                      <tr key={`test${index}`}>
                        {/* <td>
                  <input type='checkbox' />
                </td> */}
                        {/* <td>{`${index + 1}`}</td> */}
                        <td>{item.name}</td>
                        <td>
                          <img
                            className="profileImg"
                            src={getImageUrl(item.image)}
                            alt=""
                          />
                        </td>

                        <td>{item.createdAt}</td>
                        <td>{item.type}</td>
                        {/* <td className="active">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </td> */}
                        <td>
                          <div className="d-flex">
                            <button onClick={() => { editBanner(item._id) }} className="editBtn">
                              <img src={pencilEditIcon} alt="pencilEditIcon" />
                            </button>
                            <button onClick={() => { deleteOpenModal(item._id) }} className="deleteBtn">
                              <img src={deleteIcon} alt="deleteIcon" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {banners.length === 0 && <>
                <NoDataFound />
              </>}
              {banners.length > 10 && (
                <div className="mt-5">
                  <Pagination />
                </div>
              )}
            </>
            <div className="select-all mt-4 d-flex align-items-center">
              {/* <label className='d-flex align-items-center gap-2'>
                <input type='checkbox'></input>select-all
              </label> */}
            </div>
          </div>
        </div>
      </div>

{/* 
      <ModalInner
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      /> */}

<>
        {modalShow && (
          <BannerModal
            show={modalShow}
            schema={serviceSchema}
            file={file}
            formik={formik}
            cancelButton={cancelButton}
            handleFileChange={handleFileChange}
            type={tags}
          ></BannerModal>
        )}
</>
    </>
  );
};

export { BannerWrapper };
