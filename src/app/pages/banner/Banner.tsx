import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import coupon from "../../../_metronic/images/coupon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import { Table } from "react-bootstrap";
import Pagination from "../../components/pagenation";
import { useCallback, useEffect, useState } from "react";
import { deleteBanner, deleteVender, getBanner, getBanners } from "../../services/_requests";
import pencilEditIcon from "../../../_metronic/images/pencilEditIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addBanner, commonFileUpload } from "../../services/_requests";
import "./styles.scss"
import { toast } from "react-toastify";
import NoDataFound from "../../components/common/NoDataFound";
import BannerModal from "./addBannerModal";
import moment from "moment";
import dummyImg from "../../../_metronic/images/dummy.webp";
import { useDebounce } from "../../../_metronic/helpers";
import ModalInner from "../../modals/deleteModal";

const BannerWrapper = () => {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState<any>(null);
  const [modalShow, setModalShow] = useState(false);
  const intl = useIntl();
  const [id, setId] = useState("");
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0);
  const { REACT_APP_IMAGE_URL } = process.env;
  const [searchValue, setSearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [totalRecord, setTotalRecord] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getBannersList();
  }, [debounceValue, skip]);

  const initialValues = {
    name: '',
    image: '',
    type: '',
  }

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    // image: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        console.log("values", values);
        const imageUrl = await upload(file);
        console.log("imageUrl", imageUrl);
        const data = { ...values, image: imageUrl };
        console.log("data", data);
        await addBanner(data);
        closeBannerModal();
        getBannersList();
      } catch (error:any) {
        console.error(error);
        toast.error(error.message || 'An error occurred');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const getBannersList = async () => {
    try {
      await getBanners(searchValue, skip, limit).then((res: any) => {
        setBanners(res?.data?.data);
        setTotalRecord(res.data?.totalRecord)
      });
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = async (file: any) => {
    console.log("filefilefilefile", file);
    setFile(file);

    // if (e.target?.files && e.target?.files.length > 0) {
    //   const file = e.target.files[0];
    //   const fileSize = file.size / 1024 / 1024;

    //   if (fileSize > 2) {
    //     renderMessageToaster(FILE_SIZE, 'error');
    //     return;
    //   }

    //   const fileReader = new FileReader();
    //   fileReader.onloadend = function () {
    //     const result = fileReader.result;
    //     if (result && typeof result !== 'string') {
    //       const arr = new Uint8Array(result).subarray(0, 4);
    //       const header = arr.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), "");

    //       const fileType = fileTypeMap[header] || UNKNOWN;

    //       if (fileType === UNKNOWN) return renderMessageToaster(INVALID_IMAGE, 'error');

    //       setFile(URL.createObjectURL(file));
    //       const formData = new FormData();
    //       formData.append('image', file);
    //       commonFileUpload(formData).then((res) => {
    //         if (res.data.responseCode === 200) {
    //           formik.setFieldValue('image', res.data.data.url);
    //         }
    //       });
    //     } else {
    //       renderMessageToaster(UNABLE, 'error');
    //     }
    //   };

    //   fileReader.readAsArrayBuffer(file);
    // }
  };

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
  

  const tags = ["TOP", "MIDDLE", 'BOTTOM'];

  const editBanner = async (id: any) => {
    await getBanner(id).then((res) => {
      const { name, image, type } = res.data.data;
      formik.setValues({ name, image, type });
      setFile(`${process.env.REACT_APP_IMAGE_URL}${image}`)
      addBannerModal()
    }).catch((error) => { console.log(error) })
  }

  const deleteUser: any = async (event: any) => {
    if (event) {
      await deleteBanner(id).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("Banner Deleted Successfully");
          setShowDeleteModal(false);
          getBannersList();
        }
      });
      setShowDeleteModal(false);
      getBannersList();
    }
  };

  const getImageUrl = (imageUrl: string) => {
    if (imageUrl.startsWith('upload')) {
      return REACT_APP_IMAGE_URL + imageUrl;
    } else {
      return imageUrl;
    }
  }

  const deleteOpenModal = (id: string) => {
    setShowDeleteModal(true);
    setId(id);
  };

  const addBannerModal = () => {
    setModalShow(true)
  };

  const closeBannerModal = () => {
    setModalShow(false)
    formik.resetForm();
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setId('');
  }

  const debounceVal = useDebounce(searchValue, 1000);

  useEffect(() => {
    setDebounceValue(searchValue);
  }, [debounceVal]);

  const paginitionClbk = useCallback((val: number) => {
    setSkip((val - 1) * limit);
  }, [limit]);

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
                onChange={(e) => setSearchValue(e.target.value)}
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
                  <th>Title</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {banners &&
                  banners.length > 0 &&
                  banners.map((item: any, index) => (
                    <tr key={item?._id}>
                      <td>{`${index + 1}`}</td>
                      <td>{item?.name ? item.name : 'N/A'}</td>
                      <td>
                        <img
                          className="profileImg"
                          src={item.image ? getImageUrl(item.image) : dummyImg}
                          alt=""
                        />
                      </td>
                      <td>{item.type}</td>
                      <td>{moment(item.createdAt).format("dddd, MMM DD, h:mm a")}</td>
                      <td>
                        <div className="d-flex">
                          {/* <button onClick={() => { editBanner(item._id) }} className="editBtn">
                            <img src={pencilEditIcon} alt="pencilEditIcon" />
                          </button> */}
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
          </div>

          {totalRecord > 10 && <Pagination
            limit={limit}
            totalRecord={totalRecord}
            paginitionClbk={paginitionClbk}
          />}

        </div>
      </div>
      {modalShow && (
        <BannerModal
          show={modalShow}
          schema={serviceSchema}
          file={file}
          formik={formik}
          cancelButton={closeBannerModal}
          handleFileChange={handleFileChange}
          type={tags}
        ></BannerModal>
      )}
      <ModalInner
        deleteUserClbk={deleteUser}
        openModal={showDeleteModal}
        closeModal={closeDeleteModal}
      />
    </>
  );
};

export { BannerWrapper };
