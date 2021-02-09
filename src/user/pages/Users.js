import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Amir Aizin",
      image: "https://via.placeholder.com/150/24f355",
      tenant: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
