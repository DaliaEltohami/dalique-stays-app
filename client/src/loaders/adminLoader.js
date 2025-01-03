import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";

const adminLoader = async () => {
  const userData = await auth.checkAuth();
  if (!userData) {
    return redirect("/login");
  } else if (!userData.user.isAdmin) {
    return redirect("/app");
  }
  try {
    // Fetch all resources in parallel
    const [bookingsResponse, roomsResponse, usersResponse] = await Promise.all([
      fetch("/api/bookings/getallbookings"),
      fetch("/api/rooms/getallrooms"),
      fetch("/api/auth/getallusers"),
    ]);

    // Check if any request failed
    if (!bookingsResponse.ok || !roomsResponse.ok || !usersResponse.ok) {
      throw new Error("Failed to fetch required data");
    }

    // Parse all responses
    const [bookings, rooms, users] = await Promise.all([
      bookingsResponse.json(),
      roomsResponse.json(),
      usersResponse.json(),
    ]);

    return {
      bookings,
      rooms,
      users,
      error: null,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    return {
      bookings: [],
      rooms: [],
      users: [],
      error: "Failed to load required data",
    };
  }
};

export default adminLoader;
