import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import settingIcon from "../../../_metronic/images/setting.svg";
import Pagination from "../../components/common/pagination/index";
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
  resetServiceForm,
  editServiceRequest,
} from "../../redux/reducer/serviceSlice";
import {
  closeModalRequest,
  openModalRequest,
} from "../../redux/reducer/modalSlice";
import { getCategoryRequest, resetCategoryForm } from "../../redux/reducer/categorySlice";
import { getSubCategoryRequest, resetSubCategoryForm } from "../../redux/reducer/subCategorySlice";
import Servicetable from "../../components/serviceTable/index";
import { REQUIRED_FIELD } from "../../utils/ErrorMessages";
import { AddServiceModal } from "./addServiceModal";
import { useDebounce } from "../../../_metronic/helpers";

const ServiceWrapper = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const state: any = useSelector((state) => state);
  const categoriesState: [] = useSelector((state: any) => state.category.categoryList);
  const totalCategory = useSelector((state: any) => state.category.totalRecord);
  const totalSubCategory = useSelector((state: any) => state.subcategory.totalRecord);
  const subCategriesState: [] = useSelector((state: any) => state.subcategory.subCategoryList);
  const serviceState: [] = useSelector(
    (state: any) => state.service.serviceList
  );
  const { initialValues, totalRecord } = useSelector((state: any) => state.service)
  const [selectedTab, setSelectedTab] = useState(state.service.selectedTab);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  // const [totalRecord, setTotalRecord] = useState(state?.category?.totalRecord);
  const [search, setSearch] = useState("");

  const { isOpen } = useSelector((state: any) => state.modal);
  const debounceVal = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (selectedTab === "service") {
      dispatch(getServiceRequest({ search, skip, limit }));
    }
  }, [dispatch, search, skip, limit]);

  useEffect(() => {
    if (selectedTab === "category") {
      dispatch(getCategoryRequest({ search: searchValue, skip, limit }));
    }
  }, [dispatch, debounceVal, skip, limit]);

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

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: serviceSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const serviceForm = {
          name: values.name,
          image: values.image,
          category: values.category,
          subcategory: values.subcategory,
          gender: values.gender,
          description: values.description,
          cost: values.cost,
          hours: values.hours,
          minutes: values.minutes,
        };
        if (values._id) {
          dispatch(editServiceRequest({ ...serviceForm, _id: values._id }));
          dispatch(closeModalRequest({}));
        } else {
          dispatch(serviceRequest({ ...serviceForm }));
          dispatch(closeModalRequest({}));
        }

      }
      catch (error) {
        console.error(error)
      }
      finally {
        setSubmitting(false);
      }
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
    dispatch(resetServiceForm());
    setFile('');
  };

  const modalClose = () => {
    dispatch(closeModalRequest({}));
  };

  const onChangeTab = (key) => {
    setSelectedTab(key);
    dispatch(selectTab(key));
    switch (key) {
      case "service":
        dispatch(getServiceRequest({ search, skip, limit }));
        break;
      case "category":
        dispatch(getCategoryRequest({ search, skip, limit }));
        dispatch(resetCategoryForm());
        break;
      case "subcategory":
        dispatch(getSubCategoryRequest({ search, skip, limit }));
        dispatch(resetSubCategoryForm());
        break;
      default:
        break;
    }
  };

  const clearFormData = () => {
    formik.resetForm();
    dispatch(resetServiceForm())
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
          <button onClick={() => {
            dispatch(openModalRequest());
            dispatch(resetServiceForm());
            setFile('');
          }} className="yellowBtn">
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
              {/* <div className="searchbar_filter d-flex justify-content-end">
                <div className="searchbar">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => setSearchValue }
                  />
                  <button>
                    <img src={searchIcon} alt="searchIcon" />
                  </button>
                </div>
              </div> */}
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
              {/* <div className="searchbar_filter d-flex justify-content-end">
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
              </div> */}
              <div className="tableWrapper my-5">
                <TableCategory />
              </div>
              {totalCategory > 10 && (
                <Pagination
                  data={categoriesState}
                  limit={limit}
                  totalRecord={totalCategory}
                  paginitionClbk={(e: any) => {
                    paginitionClbk(e);
                  }}
                />
              )}
            </Tab>

            {/*Sub Category Tab Started */}
            <Tab eventKey="subcategory" title="Subcategory">
              <SubCategoryTabs />
              {/* <div className="searchbar_filter d-flex justify-content-end">
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
              </div> */}
              <div className="tableWrapper my-5">
                <TableSubCategory />
              </div>
              {totalSubCategory > 10 && (
                <Pagination
                  data={subCategriesState}
                  limit={limit}
                  totalRecord={totalSubCategory}
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
