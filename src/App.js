import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "./components/auth";

import routes from "./routes";

function App() {
  const isLoggInError = useSelector((state) => state?.auth?.loginError);

  return (
    <>
      <Routes>
        {!isLoggInError &&
          routes.map((route) => (
            <Route
              path={route.path}
              element={route.Component}
              key={route.path}
            />
          ))}
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </>
  );
}

export default App;
