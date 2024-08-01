import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import settingIcon from "../../../_metronic/images/setting.svg";
import Pagination from "../../components/pagenation/index";
import "./styles.scss";
import "../appointment/style.scss";
import { Tab, Tabs } from "react-bootstrap";
import CategoryTabs from "../../components/categoryTable/index";
import TableCategory from "../../components/categoryTable/tableCategory";
import SubCategoryTabs from "../../components/subCategoryTabs/index";
import TableSubCategory from "../../components/subCategoryTabs/tableSubCategory";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { commonFileUpload, selectTab } from "../../services/_requests";
import { useDispatch, useSelector } from "react-redux";
import {
  serviceRequest,
  getServiceRequest,
} from "../../redux/reducer/serviceSlice";
import {
  closeModalRequest,
  openModalRequest,
} from "../../redux/reducer/modalSlice";
import { getCategoryRequest } from "../../redux/reducer/categorySlice";
import { getSubCategoryRequest } from "../../redux/reducer/subCategorySlice";
import Servicetable from "../../components/serviceTable/index";
import { REQUIRED_FIELD } from "../../utils/ErrorMessages";
import { AddServiceModal } from "./addServiceModal";

const ServiceWrapper = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [subCategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const state: any = useSelector((state) => state);

  const categoriesState: [] = useSelector(
    (state: any) => state.category.categoryList
  );
  const subCategriesState: [] = useSelector(
    (state: any) => state.subcategory.subCategoryList
  );
  const serviceState: [] = useSelector(
    (state: any) => state.service.serviceList
  );
  const [selectedTab, setSelectedTab] = useState(state.service.selectedTab);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalRecord, setTotalRecord] = useState(state?.category?.totalRecord);
  const [search, setSearch] = useState("");

  const { isOpen } = useSelector((state: any) => state.modal);

  useEffect(() => {
    if (selectedTab === "service") {
      dispatch(getServiceRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    if (selectedTab === "category") {
      dispatch(getCategoryRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    if (selectedTab === "subcategory") {
      dispatch(getSubCategoryRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  const paginitionClbk = (val?: any) => {
    let skip = (val - 1) * limit;
    setSkip(skip);
  };

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const initialValues = {
    name: "",
    image: "",
    category: "",
    subcategory: "",
    gender: [],
    description: "",
    cost: "",
    hours: 0,
    minutes: 0,
  };

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    image: Yup.string().required(REQUIRED_FIELD),
    category: Yup.string().required(REQUIRED_FIELD),
    subcategory: Yup.string().required(REQUIRED_FIELD),
    gender: Yup.array().min(1).required(REQUIRED_FIELD),
    description: Yup.string()
      .min(10, "Minimum 10 charectors")
      .max(50, "Maximum 50 charectors")
      .required(REQUIRED_FIELD),
    cost: Yup.string().required(REQUIRED_FIELD),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: serviceSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      dispatch(serviceRequest({ ...values }));
      dispatch(closeModalRequest({}));
      // clearForm
      clearFormData();
    },
  });

  const handleFileChange = async (e) => {
    if (e.target?.files && e.target?.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("image", e.target?.files[0]);
      await commonFileUpload(formData).then((res: any) => {
        if (res.data.responseCode === 200) {
          formik.setFieldValue("image", res.data.data.url);
        }
      });
    }
  };
  const tags = ["Male", "Female"];

  const cancelButton = () => {
    dispatch(closeModalRequest({}));
  };

  const modalClose = () => {
    dispatch(closeModalRequest({}));
  };


  const onChangeTab = (key) => {
    setSelectedTab(key); // Updating local state
    dispatch(selectTab(key)); // Dispatching to Redux
    // Re-fetch data based on selected tab
    switch (key) {
      case "service":
        dispatch(getServiceRequest({ search, skip, limit }));
        break;
      case "category":
        dispatch(getCategoryRequest({ search, skip, limit }));
        break;
      case "subcategory":
        dispatch(getSubCategoryRequest({ search, skip, limit }));
        break;
      default:
        break;
    }
  };

  const clearFormData = () => {
    formik.resetForm();
    setSelectedCategory("");
    setSelectedSubCategory("");
    setTimeout(() => {
      setFile("");
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
              <img src={settingIcon} alt="settingIcon" />
              Services
            </h2>
            {/* <p>Facilitate seamless control over services offered by you</p> */}
          </div>
          <button onClick={() => dispatch(openModalRequest())} className="yellowBtn">
            Add
          </button>
        </div>
        <div className="tabWrapper">
          {/* <p className='viewList'>viewing 2 of 6 of 6</p> */}
          <Tabs
            activeKey={selectedTab}
            onSelect={(k: any) => onChangeTab(k)}
            defaultActiveKey="service"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="service" title="Services">
              <div className="searchbar_filter d-flex justify-content-end">
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
              <div className="tableWrapper my-5">
                <Servicetable />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {totalRecord > 10 && (
                <Pagination
                  data={serviceState}
                  limit={limit}
                  totalRecord={totalRecord}
                  paginitionClbk={(e: any) => {
                    paginitionClbk(e);
                  }}
                />
              )}
            </Tab>
            {/* Category Tab Started */}
            <Tab eventKey="category" title="Category">
              <CategoryTabs />
              <div className="searchbar_filter d-flex justify-content-end">
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
              </div>
              <div className="tableWrapper my-5">
                <TableCategory />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {/* <Pagination /> */}
              {totalRecord > 10 && (
                <Pagination
                  data={categoriesState}
                  limit={limit}
                  totalRecord={totalRecord}
                  paginitionClbk={(e: any) => {
                    paginitionClbk(e);
                  }}
                />
              )}
            </Tab>

            {/*Sub Category Tab Started */}
            <Tab eventKey="subcategory" title="Subcategory">
              <SubCategoryTabs />
              <div className="searchbar_filter d-flex justify-content-end">
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
                {/* <div className='filterWrapper'>Invalid Token
￼

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
              <div className="tableWrapper my-5">
                <TableSubCategory />
              </div>
              {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
              {totalRecord > 10 && (
                <Pagination
                  data={subCategriesState}
                  limit={limit}
                  totalRecord={totalRecord}
                  paginitionClbk={(e: any) => {
                    paginitionClbk(e);
                  }}
                />
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <>
        {show && (
          <AddServiceModal
            show={show}
            schema={serviceSchema}
            categories={categoriesState}
            file={file}
            formik={formik}
            cancelButton={cancelButton}
            handleFileChange={handleFileChange}
            genders={tags}
          ></AddServiceModal>
        )}
      </>
    </>
  );
};

export { ServiceWrapper };
