import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button, Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const PaymentSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <Card>
        <Result
          status="success"
          title="Payment Completed Successfully"
          subTitle="Thank you for your payment. Your transaction has been processed successfully."
          extra={[
            <Button
              type="primary"
              size="large"
              icon={<CalendarOutlined />}
              onClick={() =>
                navigate("/app/profile", { state: { activeKey: "2" } })
              }
              key="bookings"
            >
              View Bookings
            </Button>,
            <Button type="link" onClick={() => navigate("/")} key="home">
              Return to Home
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default PaymentSuccessful;
