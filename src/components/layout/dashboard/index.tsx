import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../../assets/scss/index.scss";


function Dashboard(props: any) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
