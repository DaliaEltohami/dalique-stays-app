import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Layout, Typography } from "antd";
import "./app.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="app-layout">
      <Header
        className="fixed-header "
        style={{ backgroundColor: "black", height: "auto", zIndex: "10" }}
      >
        <Navbar />
      </Header>

      <Content className="site-content">
        <div className="background-container">
          <div className="bg-overlay"></div>
          {/* <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div> */}
        </div>

        {/* Hero Section */}
        <div className="hero-section text-center">
          <Title level={1} className="main-title">
            Welcome to Dalique Stays
          </Title>
          <Title level={3} className="subtitle">
            Where Luxury Meets Comfort
          </Title>
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
}

export default App;
