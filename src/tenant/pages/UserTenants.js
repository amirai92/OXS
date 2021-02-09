import React from "react";
import TenantList from "../components/TenantList";

const DUMMY_TENANTS = [
  {
    id: "t1",
    name: "Dana",
    phoneNumber: "050-1231123",
    address: "20 W 34th St, New York, NY 10001",
    debt: true,
    financialDebt: "1000",
    creator: "u1",
  },
  {
    id: "t2",
    name: "Yoni",
    phoneNumber: "050-12312389",
    address: "20 W 34th St, New York, NY 10001",
    debt: false,
    creator: "u1",
  },
];

const UserTenants = () => {
  return <TenantList items={DUMMY_TENANTS} />;
};

export default UserTenants;
