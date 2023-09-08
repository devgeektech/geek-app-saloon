import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";

/**
 * All routes must goes here.
 */
const dashboardRoutes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
];

const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    title: "Login",
  },
];

/**
 * Map above mentioned routes in Route element then wrap up with Routes element.
 */
const Router = () => {
  const dashboardPageRoutes = dashboardRoutes.map(
    ({ path, title, element }) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const authPageRoutes = authRoutes.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      <Route element={<DashboardLayout />}>{dashboardPageRoutes}</Route>
      {authPageRoutes}
    </Routes>
  );
};

export default Router;
