import React from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { Table } from "antd";
import dayjs from "dayjs";

const AllBookings = () => {
  const { bookings, error } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = navigation.state === "loading";

  console.log(bookings);

  const renderBookings = () => {
    const data = bookings.data.map((booking, i) => ({
      key: i,
      bookingId: booking._id,
      createAt: dayjs(booking.createdAt).format("YYYY-MM-DD"),
      roomName: booking.room.name,
      userEmail: booking.user.email,
      checkIn: dayjs(booking.fromDate).format("YYYY-MM-DD"),
      checkOut: dayjs(booking.toDate).format("YYYY-MM-DD"),
      totalPayment: `${booking.totalPrice} L.E`,
      status: booking.status,
    }));
    const columns = [
      {
        title: "Booking ID",
        dataIndex: "bookingId",
        key: "bookingId",
      },
      {
        title: "Create At",
        dataIndex: "createAt",
        key: "createAt",
      },
      {
        title: "Room Name",
        dataIndex: "roomName",
        key: "roomName",
      },
      {
        title: "User Email",
        dataIndex: "userEmail",
        key: "userEmail",
      },
      {
        title: "Check-In",
        dataIndex: "checkIn",
      },
      {
        title: "Check-Out",
        dataIndex: "checkOut",
      },
      {
        title: "Total Payment",
        dataIndex: "totalPayment",
      },
      { title: "Status", dataIndex: "status" },
    ];
    return <Table dataSource={data} columns={columns}></Table>;
  };

  const renderContent = () => {
    if (isLoading)
      return <Loader color="green" size={50} text="Loading You Bookings..." />;
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
      return renderBookings();
    }
  };
  return <>{renderContent()}</>;
};

export default AllBookings;
