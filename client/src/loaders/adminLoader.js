import { redirect } from "react-router-dom";
import { auth } from "../utils/auth";
import { message } from "antd";

const adminLoader = async ({ request }) => {
  console.log("admin Loader");
  const userData = await auth.checkAuth();

  if (userData.user.isAdmin) {
    console.log("Is Adminnnnnnn");
    try {
      // Fetch all resources in parallel
      const [bookingsResponse, roomsResponse, usersResponse] =
        await Promise.all([
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
  } else if (userData) {
    sessionStorage.setItem(
      "adminAccessMessage",
      "You are not authorized to access the admin area"
    );
    throw redirect("/app");
  }
  const currentPath = new URL(request.url).pathname;
  return redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
};

export default adminLoader;
