import { useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import UserIcon from "../../../_metronic/images/UserIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import DeleteModal from "../../components/common/modal/DeleteModal";
import "./userStyle.scss";
import {  Table } from "react-bootstrap";
import { deleteUserApi } from "../../services/_requests";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import Pagination from "../../components/common/pagination/index";
import NoDataFound from "../../components/common/noDataFound/NoDataFound";
import dummyImg from '../../../_metronic/images/dummy.webp'
import { useDebounce } from "../../../_metronic/helpers";
import { selectUserList, selectUserListError, fetchUserListRequest  } from "../../redux/reducer/userSlice";


import { useDispatch, useSelector } from "react-redux";

const UsersWrapper = () => {
  const dispatch = useDispatch();

  const intl = useIntl();
  const state: any = useSelector((state) => state);

  const users: [] = useSelector(
    (state: any) => state.users.userList
  );
  const error = useSelector(selectUserListError);
  const {  totalRecord } = useSelector((state: any) => state.users)

  const [singleUser, setSingleUser] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [debounceVal, setDebounceVal] = useState("");

  const navigate = useNavigate();

 
  useEffect(() => {
  
    dispatch(fetchUserListRequest({ search: searchUser, skip, limit }));
  }, [dispatch,debounceVal, searchUser, skip, limit]);



  const paginitionClbk = (val?: any) => {
    let skip1 = (val - 1) * limit
    setSkip(skip1)
  }

  const deleteOpenModal = (id: string) => {
    setModalShow(true);
    setDeleteUserId(id);
  };

  const deleteCloseModal = () => {
    setModalShow(false);
  };

  const singleUserDetails = (value: any) => {
    setSingleUser(value);
  };

  const handleSearch = (event: any) => {
    setSearchUser(event.target.value);
  };

  const editUser = (id: string) => {
    navigate(`/users/edit/${id}`);
  };

  const deleteUser: any = async (event: any) => {
    if (event === true) {
      await deleteUserApi(deleteUserId).then((res: any) => {
        if (res.data.responseCode === 200) {
          toast.success("User Deleted Successfully");
          setModalShow(false);
          dispatch(fetchUserListRequest({ search: searchUser, skip, limit }));

        }
      });
      setModalShow(false);
      dispatch(fetchUserListRequest({ search: searchUser, skip, limit }));

    }
  };
  
  const debounceValue = useDebounce(searchUser, 1000);

  useEffect(() => {
    setDebounceVal(searchUser);
  }, [debounceValue]);

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div className="appointmentContent">
        <div className="title_text d-flex justify-content-between align-items-center">
          <div className="">
            <h2 className="page_title">
              <img src={UserIcon} alt="UserIcon" />
              Users
            </h2>
            {/* <p>Efficiently manage clients and their history</p> */}
          </div>
        </div>
        <div className="tabWrapper">
          {/* <p className='viewList'>viewing 2 of 6 of 6</p> */}
          {/* single user details */}
          {/* <DetailsInfo user={singleUser} /> */}
          <div className="searchbar_filter d-flex justify-content-end">
            <div className="searchbar">
              <input
                onChange={(e) => {
                  handleSearch(e);
                }}
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
            <Table responsive className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>
                        <input type="checkbox" />
                      </th> */}
                  {/* <th>Sr no</th> */}
                  {/* <th>Customer ID</th> */}
                  <th>Customer Name</th>
                  <th>Photo</th>
                  <th>Phone No.</th>
                  <th>Email</th>
                  <th>No. of Appointments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((user: any, index: any) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          singleUserDetails(user);
                        }}
                      >
                        <td>{user?.name ? user?.name : "N/A"}</td>
                        <td>
                          <img
                            src={user.profilePicture
                              ? user.profilePicture
                              : dummyImg}
                            className="user-img"
                            alt="profileImg"
                          />
                        </td>
                        <td>{user.phone ? user.phone : 'NA'}</td>
                        <td>{user?.email}</td>
                        <td>80</td>
                        <td>
                          <div className="d-flex">
                            {/* <button
                              onClick={() => {
                                editUser(user._id);
                              }}
                              className="editBtn"
                            >
                              <img
                                src={pencilEditIcon}
                                alt="pencilEditIcon"
                              />
                            </button> */}
                            <button className="deleteBtn">
                              <img
                                src={deleteIcon}
                                alt="deleteIcon"
                                onClick={() => deleteOpenModal(user._id)}
                              />
                            </button>
                            <button className="deleteBtn">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="14"
                                viewBox="0 0 13 14"
                                fill="none"
                              >
                               
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

              </tbody>
            </Table>
            {users && users.length === 0 && <>
              <NoDataFound />
            </>}
          </div>
          {/* <div className='select-all mt-4 d-flex align-items-center'>
                <label className='d-flex align-items-center gap-2'>
                  <input type='checkbox'></input>select-all
                </label>
              </div> */}
          {totalRecord > 10 && <Pagination
            data={users}
            limit={limit}
            totalRecord={totalRecord}
            paginitionClbk={(e: any) => {
              paginitionClbk(e)
            }}
          />}
        </div>
      </div>
      <DeleteModal
        deleteUserClbk={(e: any) => {
          deleteUser(e);
        }}
        openModal={modalShow}
        closeModal={deleteCloseModal}
      />

      {/* Dashboard Page Html End */}

      {/* Delete modal */}

      {/* End Delete modal */}
    </>
  );
};

export { UsersWrapper };
