import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import homeBlackIcon from "../../../_metronic/images/homeBlackIcon.svg";
import greenLineIcon from "../../../_metronic/images/greenLineIcon.svg";
import redLineIcon from "../../../_metronic/images/redLineIcon.svg";
import chart from "../../../_metronic/images/chart.jpg";
import chartBar from "../../../_metronic/images/chartBar.jpg";
import pencilEditIcon from "../../../_metronic/images/pencilEditIcon.svg";
import deleteIcon from "../../../_metronic/images/deleteIcon.svg";
import "./style.scss";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSaloonRequest, setSaloonId } from "../../redux/reducer/saloonSlice";
import { getVendors } from "../../services/_requests";

const DashboardWrapper = () => {
  const intl = useIntl();
  const state = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [lat, setLat] = useState(30.741482)
  const [lng, setLang] = useState(76.768066)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [searchUser, setSearchUser] = useState("");

useEffect(()=>{
  dispatch(getSaloonRequest({ lat, lng, skip, limit, searchUser}));
  // getSaloons()
},[])

// const getSaloons = async()=>{
//   await getVendors(lat, lng, skip, limit, searchUser).then((res: any) => {
//     if (res.data.responseCode === 200) {
//       dispatch(setSaloonId(res?.data?.data[0]?._id))
//     }
//   });
// }

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div className="dashboardContent">
        <div className="title_text">
          <h2 className="page_title">
            <img src={homeBlackIcon} alt="homeBlackIcon" />
            Dashboard
          </h2>
          <p>Keeps an overview of key metrics and information</p>
        </div>
        <div className="weeklyBlocks mb-5">
          <h2 className="h2">Weekly statistics</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mt-2 mb-2">
              <div className="card">
                <p>Users</p>
                <div className="d-flex justify-content-between">
                  <h3>12,924</h3>
                  <img src={greenLineIcon} alt="greenLineIcon" />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mt-2 mb-2">
              <div className="card">
                <p>New Users</p>
                <div className="d-flex justify-content-between">
                  <h3>5,200</h3>
                  <img src={greenLineIcon} alt="greenLineIcon" />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mt-2 mb-2">
              <div className="card">
                <p>App Downloads</p>
                <div className="d-flex justify-content-between">
                  <h3>467k</h3>
                  <img src={greenLineIcon} alt="greenLineIcon" />
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mt-2 mb-2">
              <div className="card">
                <p>Bouce rate</p>
                <div className="d-flex justify-content-between">
                  <h3>43.5%</h3>
                  <img src={redLineIcon} alt="redLineIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chartBlocks mb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="chartWrapper">
                <h2 className="h2">Daily visitor</h2>
                <div className="chartBlock">
                  <img src={chart} alt="chart" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chartWrapper">
                <h2 className="h2">Total monthly Revenue</h2>
                <div className="chartBlock">
                  <img src={chartBar} alt="chartBar" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tableWrapper mb-5">
          <h2 className="h2">My Upcoming Appointments</h2>

          <Table responsive className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Sr no</th>
                <th>Appointment ID</th>
                <th>Salon</th>
                <th>Customer Name</th>
                <th>Service (Category)</th>
                <th>Sub-Category</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>001</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="paidbadge">Paid</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>002</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="unpaidbadge">Unpaid</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>003</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="paidbadge">Paid</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>004</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="pendingbadge">Pending</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>005</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="paidbadge">Paid</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>006</td>
                <td>545151511451</td>
                <td>Cleaned Salon</td>
                <td>Joe Doe</td>
                <td>Hair, Massage</td>
                <td>
                  1 x Haircut(Spice)+1 x Shave(Normal) + 2 Body Massage(Thai)
                </td>
                <td>Tue, Sept 4, 11:30 am</td>
                <td>
                  <span className="pending">Pending</span>
                </td>
                <td>
                  <span className="paidbadge">Paid</span>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="editBtn">
                      <img src={pencilEditIcon} alt="pencilEditIcon" />
                    </button>
                    <button className="deleteBtn">
                      <img src={deleteIcon} alt="deleteIcon" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      {/* Dashboard Page Html End */}
    </>
  );
};

export { DashboardWrapper };
