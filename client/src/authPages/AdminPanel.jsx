import React from "react";
import { Tabs } from "antd";
import AllBookings from "../components/AllBookings";
import AllRooms from "../components/AllRooms";
import AllUsers from "../components/AllUsers";
import AddRoom from "../components/AddRoom";

const items = [
  {
    key: "1",
    label: "Bookings",
    children: <AllBookings />,
  },
  {
    key: "2",
    label: "Rooms",
    children: <AllRooms />,
  },
  {
    key: "3",
    label: "Add Room",
    children: <AddRoom />,
  },
  {
    key: "4",
    label: "Users",
    children: <AllUsers />,
  },
];

const AdminPanel = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-left">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
