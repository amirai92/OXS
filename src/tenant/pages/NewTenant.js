import React, { useCallback, useReducer } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./TenantForm.css";

const NewTenant = () => {
  const [formState, inputHandler] = useForm(
    {
      fullname: {
        value: "",
        isValid: false,
      },
      phonenumber: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      debt: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const tenantSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className="place-form" onSubmit={tenantSubmitHandler}>
      <Input
        id="fullname"
        element="input"
        type="text"
        label="Full Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Name."
        onInput={inputHandler}
      />
      <Input
        id="phonenumber"
        element="input"
        type="tel"
        label="Phone Number"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid phone number."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Input
        id="debt"
        element="input"
        type="text"
        label="Debt"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid debt."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Tenant
      </Button>
    </form>
  );
};

export default NewTenant;
