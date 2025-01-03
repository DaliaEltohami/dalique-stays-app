import React from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { Table } from "antd";
import dayjs from "dayjs";

const AllRooms = () => {
  const { rooms, error } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = navigation.state === "loading";

  console.log(rooms);

  const renderRooms = () => {
    const data = rooms.data.map((room, i) => ({
      key: i,
      roomId: room._id,
      roomName: room.name,
      rentPerDay: room.rentperday,
      roomType: room.type,
      roomCapacity: room.maxcount,
      totalBookings: room.currentbookings.length,
    }));
    const columns = [
      {
        title: "room ID",
        dataIndex: "roomId",
        key: "roomId",
      },
      {
        title: "Room Name",
        dataIndex: "roomName",
        key: "roomName",
      },
      {
        title: "Rent Per Night",
        dataIndex: "rentPerDay",
      },
      {
        title: "Room Type",
        dataIndex: "roomType",
      },
      {
        title: "Room Capacity",
        dataIndex: "roomCapacity",
      },
      {
        title: "Total Bookings",
        dataIndex: "totalBookings",
      },
    ];
    return <Table dataSource={data} columns={columns}></Table>;
  };

  const renderContent = () => {
    if (isLoading)
      return <Loader color="green" size={50} text="Loading You Rooms..." />;
    else if (error) {
      return (
        <Error
          error={error}
          callback={() => {
            navigate(".", { replace: true });
          }}
        />
      );
    } else {
      return renderRooms();
    }
  };
  return <>{renderContent()}</>;
};

export default AllRooms;
