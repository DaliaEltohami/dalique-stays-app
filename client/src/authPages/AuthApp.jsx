import { Outlet, useLoaderData } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import { message } from "antd";
import { useEffect } from "react";

const AuthApp = () => {
  console.log("AuthApp Rendered!");

  useEffect(() => {
    const adminMessage = sessionStorage.getItem("adminAccessMessage");
    if (adminMessage) {
      message.warning(adminMessage);
      sessionStorage.removeItem("adminAccessMessage");
    }
  }, []);

  return (
    <div className="App">
      <AuthNavbar />
      <Outlet />
    </div>
  );
};

export default AuthApp;
