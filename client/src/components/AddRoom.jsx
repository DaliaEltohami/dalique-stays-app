import { notification } from "antd";
import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    maxCount: "",
    rentPerNight: "",
    phoneNumber: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormDataChange = (e) => {
    setFormData((Prev) => {
      if (e.target.name === "images") {
        const imgs = [...formData.images, e.target.value];
        return { ...Prev, images: imgs };
      } else {
        return { ...Prev, [e.target.name]: e.target.value };
      }
    });
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      setError(null);
      const request = await axios.post("/api/rooms/addroom", formData);
      if (request.status === 200) {
        notification.success({ message: "Room Added Successfully" });
        setFormData({
          name: "",
          description: "",
          type: "",
          maxCount: "",
          rentPerNight: "",
          phoneNumber: "",
          images: [],
        });
      }
    } catch (error) {
      notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="col-md-10 mx-auto d-flex flex-column"
      style={{ textAlign: "center" }}
    >
      <h1>Add Room Data</h1>
      {loading && <Loader text="Creating Room..." />}
      <div>
        <form className="d-flex flex-column">
          <input
            name="name"
            className="form-input form-control"
            placeholder="Room Name"
            required
            onChange={handleFormDataChange}
            value={formData.name}
          ></input>
          <input
            name="description"
            className="form-input form-control"
            placeholder="Room Description"
            required
            onChange={handleFormDataChange}
            value={formData.description}
          ></input>
          <select
            name="type"
            className="form-control form-input form-select"
            value={formData.type}
            style={{
              color: formData.type === "" ? "#6c757d" : "#374151",
            }}
            required
            onChange={handleFormDataChange}
          >
            <option value="" disabled>
              Room Type
            </option>
            <option value="standard">standard</option>
            <option value="delux">dulex</option>
            <option value="family suite">family suite</option>
          </select>
          <input
            name="maxCount"
            className="form-input form-control"
            placeholder="Room Max Count"
            required
            onChange={handleFormDataChange}
            value={formData.maxCount}
          ></input>
          <input
            name="rentPerNight"
            className="form-input form-control"
            placeholder="Room Rent Per Night"
            required
            onChange={handleFormDataChange}
            value={formData.rentPerNight}
          ></input>
          <input
            name="phoneNumber"
            className="form-input form-control"
            placeholder="Room Phone Number"
            required
            onChange={handleFormDataChange}
            value={formData.phoneNumber}
          ></input>

          <div
            style={{
              padding: "10px",
              border: "1px solid black",
              marginTop: "10px",
              borderRadius: "5px",
            }}
            className="bs"
          >
            <label className="d-block text-start text-bold">
              Room Images: add at least one image
            </label>
            <input
              name="images"
              className="form-input form-control"
              placeholder="Image 1"
              required
              onChange={handleFormDataChange}
              value={formData.images.length > 0 ? formData.images[0] : ""}
            ></input>
            <input
              name="images"
              className="form-input form-control"
              placeholder="Image 2"
              onChange={handleFormDataChange}
              value={formData.images.length > 1 ? formData.images[1] : ""}
            ></input>
            <input
              name="images"
              className="form-input form-control"
              placeholder="Image 3"
              onChange={handleFormDataChange}
              value={formData.images.length > 2 ? formData.images[2] : ""}
            ></input>
          </div>

          <button
            className="btn btn-dark m-3 "
            type="submit"
            onClick={handleRoomSubmit}
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
