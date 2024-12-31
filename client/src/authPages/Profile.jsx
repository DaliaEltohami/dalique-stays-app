import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Error from "../components/Error";
import Loader from "../components/Loader";
import axios from "axios";

const Profile = () => {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <ProfileData />,
    },
    {
      key: "2",
      label: "My Bookings",
      children: <Bookings />,
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-left">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = () => {
  const { userData } = useAuth();
  console.log(userData);
  return (
    <div>
      {userData && (
        <>
          <p>
            <b>User ID:</b> {userData._id}
          </p>
          <p>
            <b>Name:</b> {userData.name}
          </p>
          <p>
            <b>Emial:</b> {userData.email}
          </p>
          <p>
            <b>Is Admin:</b> {userData.isAdmin ? "yes" : "No"}
          </p>
        </>
      )}
    </div>
  );
};

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState(null);

  const { userData } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userId: userData._id,
        })
      ).data;
      setBookings(response.bookings);
      console.log(response.bookings);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderBookings = () => {
    console.log("render bookingssssss");
    if (bookings.length <= 0)
      return (
        <div className="card mb-4 bs border-0">
          <div className="card-body h-50 d-flex flex-column">
            <p>No Bookings</p>
          </div>
        </div>
      );
    return bookings.map((booking) => (
      <div className="card mb-4 bs border-0 ">
        <div className="position-relative h-50">
          <img
            src={booking.room.imageurls[0]}
            className="w-100 h-100 object-fit-cover border-radius-5"
            alt={`${booking.room.name} preview`}
          />
          <div className="position-absolute top-0 start-0 p-3 d-flex gap-2">
            <span className="badge bg-black">{booking.room.type}</span>
          </div>
        </div>
        <div className="card-body h-50 d-flex flex-column">
          <div>
            <p>
              <b>Booking ID: </b>
              {booking._id}
            </p>
            <p>
              <b>Room ID: </b>
              {booking.room._id}
            </p>
            <p>
              <b>Room Name: </b>
              {booking.room.name}
            </p>
            <p>
              <b>Check-In: </b>
              {booking.fromDate}
            </p>
            <p>
              <b>Check-Out: </b>
              {booking.toDate}
            </p>
            <p className="mt-auto text-end">
              <button className="btn btn-dark">Cancle Booking</button>
            </p>
          </div>
        </div>
      </div>
    ));
  };

  const renderContent = () => {
    if (loading)
      return <Loader color="#000" size={100} text="Loading Your Bookings..." />;
    if (error) return <Error error={error} callback={fetchBookings} />;
    return renderBookings();
  };

  return <div>{renderContent()}</div>;
};

export default Profile;
