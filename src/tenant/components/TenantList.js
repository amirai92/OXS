import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import TenantItem from "./TenantItem";
import "./TenantList.css";

const TenantList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Tenant found. Maybe create one?</h2>
          <Button to="/tenant/new">Create Tenant</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <TenantItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          phoneNumber={place.phoneNumber}
          debt={place.debt}
          address={place.address}
          creatorId={place.creator}
        />
      ))}
    </ul>
  );
};

export default TenantList;
