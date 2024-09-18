import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import settingIcon from "../../../_metronic/images/setting.svg";
import Pagination from "../../components/common/pagination/index";
import "./styles.scss";
import "../appointment/style.scss";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import CategoryTabs from "../../components/categoryTabs/index";
import TableCategory from "../../components/categoryTabs/table";
import SubCategoryTabs from "../../components/subCategoryTabs/index";
import TableSubCategory from "../../components/subCategoryTabs/table";
import { useEffect, useState } from "react";
import { Field, useFormik } from "formik";
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
import { getSaloonRequest, setSaloonId } from "../../redux/reducer/saloonSlice";
import { fetchDataSaga } from "../../redux/saga/serviceSaga";
import { fetchListRequest } from "../../redux/actions/serviceAction";
import { toast } from 'react-toastify'
import { REQUIRED, SALOON_ID_REQUIRED } from "../../utils/const";


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
  const [lat, setLat] = useState(30.741482)
  const [lng, setLang] = useState(76.768066)
  const [searchUser, setSearchUser] = useState("");

  const { initialValues, totalRecord } = useSelector((state: any) => state.service)
  const [selectedTab, setSelectedTab] = useState(state.service.selectedTab);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { saloonList, saloonId } = useSelector((state: any) => state.saloon);
  const [search, setSearch] = useState("");
  const limit = 10;
  const skip = 0;

  const { isOpen } = useSelector((state: any) => state.modal);
  const debounceVal = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (selectedTab === "service") {
      dispatch(fetchListRequest(0, 0, ''));
    }
  }, [dispatch, search, saloonId]);

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

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);


  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    image: Yup.string().required(REQUIRED_FIELD),
    category: Yup.string().required(REQUIRED_FIELD),
    gender: Yup.array().min(1).required(REQUIRED_FIELD),
    description: Yup.string().required(REQUIRED_FIELD),
    cost: Yup.number().required(REQUIRED_FIELD),
  });

  const formik: any = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: serviceSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if(!saloonId) {
          toast.success(SALOON_ID_REQUIRED);
        }
        const serviceForm = {
          name: values.name,
          image: values.image,
          category: values.category,
          subcategory: values.subcategory,
          // saloon: values.saloon,
          gender: values.gender,
          description: values.description,
          cost: values.cost,
          hours: values.hours,
          minutes: values.minutes,
          saloonId: saloonId
        };
        if (values._id) {
          dispatch(editServiceRequest({ ...serviceForm, _id: values._id }));
          dispatch(closeModalRequest({}));
          dispatch(resetServiceForm());
          dispatch(fetchListRequest(0, 0, ''));
        } else {
          dispatch(serviceRequest({ ...serviceForm }));
          dispatch(closeModalRequest({}));
          dispatch(resetServiceForm());
        }
        dispatch(fetchListRequest(0, 0, ''));
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
    setShow(false);
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
          </div>

          <button onClick={() => {
            dispatch(openModalRequest());
            dispatch(resetServiceForm());
            formik.resetForm();
            setFile('');
          }} className="yellowBtn">
            Create a Service
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

            {/* Category Tab Started */}
            <Tab eventKey="category" title="Category">
              <CategoryTabs />

              <div className="tableWrapper my-5">
                <TableCategory />
              </div>
            </Tab>

            {/*Sub Category Tab Started */}
            <Tab eventKey="subcategory" title="Subcategory">
              <SubCategoryTabs />

              <div className="tableWrapper my-5">
                <TableSubCategory />
              </div>
            </Tab>
            <Tab eventKey="service" title="Services">

              <div className="tableWrapper my-5">
                <Servicetable />
              </div>

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
