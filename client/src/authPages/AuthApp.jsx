import { Outlet } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import { message } from "antd";
import { useEffect } from "react";
import { Layout } from "antd";
import "../pages/app.css";

const { Header, Content, Footer } = Layout;

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
    <Layout className="app-layout">
      <Header
        className="fixed-header "
        style={{ backgroundColor: "black", height: "auto", zIndex: "10" }}
      >
        <AuthNavbar />
      </Header>

      <Content className="site-content">
        <div className="background-container">
          <div className="bg-overlay"></div>
          {/* <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div> */}
        </div>

        {/* Main Content (DatesForm) */}
        <div className="main-content container">
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        Dalique Stays ©{new Date().getFullYear()} All Rights Reserved
      </Footer>
    </Layout>
  );
};

export default AuthApp;
