import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import settingIcon from "../../../_metronic/images/setting.svg";
import "./styles.scss";
import "../appointment/style.scss";
import { Tab, Tabs } from "react-bootstrap";
import CategoryTabs from "../../components/categoryTabs/index";
import TableCategory from "../../components/categoryTabs/table";
import SubCategoryTabs from "../../components/subCategoryTabs/index";
import TableSubCategory from "../../components/subCategoryTabs/table";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { commonFileUpload, selectTab } from "../../services/_requests";
import { useDispatch, useSelector } from "react-redux";
import {
  serviceRequest,
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
import { fetchListRequest } from "../../redux/actions/serviceAction";
import { toast } from 'react-toastify'
import { setRequestStatus } from "../../redux/actions/helper/helperSlice";
import { CATEGORY, GENDER_TAGS, SALOON_ID_REQUIRED, SERVICE, SUBCATEGORY } from "../../utils/const";


const ServiceWrapper = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [coverImages, setCoverImages] = useState([])
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const state: any = useSelector((state) => state);
  const categoriesState: [] = useSelector((state: any) => state.category.categoryList);
  const { initialValues, selectedTab } = useSelector((state: any) => state.service)
  // const [selectedTab, setSelectedTab] = useState(state.service.selectedTab);
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
    if (selectedTab === "subcategory") {
      dispatch(getSubCategoryRequest({ search, skip, limit }));
    }
  }, [dispatch, search, debounceVal, skip, limit]);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const serviceSchema = Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    image: Yup.string().optional(),
    category: Yup.string().required(REQUIRED_FIELD),
    gender: Yup.array().required(REQUIRED_FIELD),
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
        if (!saloonId) {
          toast.success(SALOON_ID_REQUIRED);
        }
        const serviceForm: any = {
          name: values.name,
          image: values.image,
          category: values.category,
          subcategory: values.subcategory,
          gender: values.gender,
          description: values.description,
          cost: values.cost,
          hours: values.hours,
          minutes: values.minutes,
          saloonId: saloonId
        };
        if(coverImages.length) {
          serviceForm.coverImages = coverImages
        }
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
        dispatch(setRequestStatus(false))
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setSubmitting(false);
      }
    },
  });

  const onChangeDropImages = (value) => {
    setCoverImages(value)
  }

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

  const cancelButton = () => {
    dispatch(closeModalRequest({}));
    dispatch(resetServiceForm());
    setFile('');
    setShow(false);
  };

  const onChangeTab = (key) => {
    // setSelectedTab(key);
    dispatch(selectTab(key));
    switch (key) {
      case "service":
        dispatch(fetchListRequest({ search, skip, limit }));
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
          <Tabs
            activeKey={selectedTab}
            onSelect={(k: any) => onChangeTab(k)}
            defaultActiveKey="service"
            id="uncontrolled-tab-example"
          >

            {/* Category Tab Started */}
            <Tab eventKey={CATEGORY} title="Category">
              <CategoryTabs />

              <div className="tableWrapper my-5">
                <TableCategory />
              </div>
            </Tab>

            {/*Sub Category Tab Started */}
            <Tab eventKey={SUBCATEGORY} title="Subcategory">
              <SubCategoryTabs />

              <div className="tableWrapper my-5">
                <TableSubCategory />
              </div>
            </Tab>
            <Tab eventKey={SERVICE} title="Services">

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
            genders={GENDER_TAGS}
            changeDropImages={onChangeDropImages}
            coverImages={coverImages}
          ></AddServiceModal>
        )}
      </>
    </>
  );
};

export { ServiceWrapper };
