import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./TenantForm.css";
import { useForm } from "../../shared/hooks/form-hook";

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
    creator: "u2",
  },
];

const UpdateTenant = () => {
  const [isLoading, setIsLoading] = useState(true);

  const tenantId = useParams().tenantId;

  const [formState, inputHandler, setFormData] = useForm({
    phoneNumber: {
      value: "",
      isValid: true,
    },
    address: {
      value: "",
      isValid: true,
    },
    debt: {
      value: "",
      isValid: true,
    },
  });
  const identifiedTenant = DUMMY_TENANTS.find((p) => p.id === tenantId);
  useEffect(() => {
    if (identifiedTenant) {
      setFormData(
        {
          phoneNumber: {
            value: identifiedTenant.phoneNumber,
            isValid: true,
          },
          address: {
            value: identifiedTenant.address,
            isValid: true,
          },
          debt: {
            value: identifiedTenant.debt,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedTenant]);
  const tenantSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!identifiedTenant) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find tenant!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={tenantSubmitHandler}>
      <Input
        id="phonenumber"
        element="input"
        type="tel"
        label="Phone Number"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid phone number."
        onInput={inputHandler}
        initialValue={formState.inputs.phoneNumber.value}
        initialValid={formState.inputs.phoneNumber.isValid}
      />
      <Input
        id="address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Input
        id="debt"
        element="textarea"
        label="Debt"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.debt.value}
        initialValid={formState.inputs.debt.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdateTenant;
