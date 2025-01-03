import React from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { Table } from "antd";

const AllUsers = () => {
  const { users, error } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isLoading = navigation.state === "loading";

  const renderUsers = () => {
    const data = users.data.map((user, i) => ({
      key: i,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      credentials: user.isAdmin ? "Admin" : "User",
    }));
    const columns = [
      {
        title: "User ID",
        dataIndex: "userId",
      },
      {
        title: "User Name",
        dataIndex: "userName",
      },
      {
        title: "Email",
        dataIndex: "userEmail",
      },
      {
        title: "Credentials",
        dataIndex: "credentials",
      },
    ];
    return <Table dataSource={data} columns={columns}></Table>;
  };

  const renderContent = () => {
    if (isLoading)
      return <Loader color="green" size={50} text="Loading You Users..." />;
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
      return renderUsers();
    }
  };
  return <>{renderContent()}</>;
};

export default AllUsers;
