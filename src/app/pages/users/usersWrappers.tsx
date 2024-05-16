import { useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import UserIcon from "../../../_metronic/images/UserIcon.svg";
import pencilEditIcon from "../../../_metronic/images/pencilEditIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import searchIcon from "../../../_metronic/images/searchIcon.svg";
import Jhondeo from "../../../_metronic/images/jhonDeo.svg";
import ModalInner from "../../modals/deleteModal";

import "./userStyle.scss";
import { Dropdown, Tab, Table, Tabs } from "react-bootstrap";
import { deleteUserApi, getUsersList } from "../../modules/auth/core/_requests";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../components/pagenation/index";
import NoDataFound from "../../components/common/NoDataFound";


const UsersWrapper = () => {
  const intl = useIntl();
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    getUserList(searchUser);
  }, [searchUser, skip]);

  const getUserList = (searchUser) => {
    getUsersList(searchUser, skip, limit).then((res: any) => {
      if ((res.data.responseCode === 200)) {
        setUsers(res.data.data);
        setTotalRecord(res.data?.totalRecord)
        setSingleUser(res.data?.data[0]);
      }
    });
  };


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
    if (event && event.target.value !== "") {
      setSearchUser(event.target.value);
    }
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
          getUserList(searchUser);
        }
      });
      setModalShow(false);
      getUserList(searchUser);
    }
  };

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
                        {/* <td>
                              <input type="checkbox" />
                            </td> */}
                        {/* <td>{index + 1}</td> */}
                        {/* <td>545151511451</td> */}
                        <td>{user?.name}</td>
                        <td className="text-center">
                          <img
                            src={Jhondeo}
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
                                <path
                                  d="M4 11.5L8 7.5L4 3.5"
                                  stroke="#8D8D8D"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {users&&users.length ===0 && <>
                   <NoDataFound/>
                  </>}
              </tbody>
            </Table>
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
      <ModalInner
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
