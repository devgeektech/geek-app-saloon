import { FC, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { AuthPage } from "../modules/auth";
import { App } from "../App";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { PUBLIC_URL } = process.env;


const AppRoutes: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoding] = useState(false);

  const state = useSelector((state: any) => state.login);


  const { saloonList, saloonId } = useSelector((state: any) => state.saloon);
  

  useEffect(() => {
    setIsAuthenticated(state.isAuthenticated);
    setLoding(state.loading);
  }, [isAuthenticated,  state, saloonId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/saloon" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />          ) : (

            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
