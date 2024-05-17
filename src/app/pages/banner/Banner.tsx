import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import coupon from "../../../_metronic/images/coupon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Pagination from "../../components/pagenation";
import { useEffect, useState } from "react";
import { deleteBanner, getBanners } from "../../services/_requests";
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

const BannerWrapper = () => {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState<any>(null);
  const [show, setShow] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const intl = useIntl();
  const [deleteUserId, setDeleteUserId] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)

  useEffect(() => {
    getBannersList();
  }, []);

  const getBannersList = async () => {
    await getBanners(search, skip, limit).then((res: any) => {
      setBanners(res.data?.data);
    });
  }


  const addBannerModal = () => {
    setShow(true);
  };

  const closeBannerModal = () => {
    setShow(false);
  };

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
        getBannersList()
        formik.resetForm();
      }).catch((error) => {
        toast.error(error.response.data.responseMessage)
      })

    },
  })

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

  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
  };

  const deleteCloseModal = () => {
    setModalShow(false);
  };

  const getImageUrl = (imageUrl) => {
    const baseUploadPath = process.env.REACT_APP_IMAGE_URL;
    if (imageUrl.startsWith('upload')) {
      return baseUploadPath + imageUrl;
    } else {
      return imageUrl;
    }
  }

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
          <button onClick={() => { addBannerModal() }} className="yellowBtn">
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
                    <th>Status</th>
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
                        <td className="active">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button className="editBtn">
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

      <Modal show={show} onHide={closeBannerModal}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col sm={12}>
                    <label htmlFor='name'>Caption</label>
                    <input
                      type='text'
                      autoComplete='off'
                      placeholder='Image caption'
                      {...formik.getFieldProps('name')}
                      className={clsx(
                        'form-control bg-transparent',
                        {
                          'is-invalid': formik.touched.name && formik.errors.name,
                        },
                        {
                          'is-valid': formik.touched.name && !formik.errors.name,
                        }
                      )}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.name}</span>
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col sm={12} className='mt-4'>
                    <Form.Select  {...formik.getFieldProps('type')} aria-label='Default select example' name='type'>
                      <option>Select</option>
                      <option value='TOP'>Top</option>
                      <option value='MIDDLE'>Middle</option>
                      <option value='BOTTOM'>Bottom</option>
                    </Form.Select>
                    {formik.touched.type && formik.errors.type && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.type}</span>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    {/* <div
                      className="dropzone my-5"
                    // onDragOver={handleDragOver}
                    // onDrop={handleDrop}
                    >
                      <h1> <img src={searchIcon} alt="" /> </h1>
                      <h6>Drag your file(s) to start uploading</h6>
                      <h1>Or</h1>
                      <input
                        type="file"
                        multiple
                        // onChange={handleFileSelection}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                      />
                      <button type="button" onClick={() => inputRef.current.click()}>
                        Browse Files
                      </button>
                    </div> */}
                    <div className="mt-5">
                      <label className='form-label'>
                        <small>Upload Picture</small>
                      </label>
                      <div className='fv-row mb-4'>
                        <input
                          type='file'
                          placeholder='Image'
                          // {...formik.getFieldProps('image')}
                          className={clsx(
                            'form-control bg-transparent',
                            {
                              'is-invalid': formik.touched.image && formik.errors.image,
                            },
                            {
                              'is-valid': formik.touched.image && !formik.errors.image,
                            }
                          )}
                          // value={formik.values.image}
                          onChange={(e: any) => {
                            handleFileChange(e)
                          }}
                        />
                        {formik.touched.image && formik.errors.image && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.image}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col sm={6} className='mt-4'>
                    <div>
                      {file && (
                        <img className='w-100 rounded-2' src={file} alt='UploadImage' />
                      )}
                    </div>
                  </Col>
                </Row>
              </form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-grid d-flex mb-10">
              {/* <Button className='blackBtn btn-sm' onClick={cancelButton}>
                Cancel
              </Button> */}
              <button
                className="blackBtn btn-sm mx-2"
                // id="kt_sign_in_submit"
              // disabled={formik.isSubmitting || !formik.isValid}
              >
                {/* {!loading &&  */}
                <span className="indicator-label">Cancel</span>
                {/* } */}
                {/* {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )} */}
              </button>
              <button
                className="blackBtn btn-sm"
                type="submit"
                id="kt_sign_in_submit"
              // disabled={formik.isSubmitting || !formik.isValid}
              >
                {/* {!loading &&  */}
                <span className="indicator-label">Add Banner</span>
                {/* } */}
                {/* {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )} */}
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>


      <ModalInner
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />
    </>
  );
};

export { BannerWrapper };
