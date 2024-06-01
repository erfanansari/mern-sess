/**
 *
 * AddAddress
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";

import Checkbox from "../../Common/Checkbox";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

const AddAddress = (props) => {
  const { addressFormData, formErrors, addressChange, addAddress } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addAddress();
    console.log("hi");
  };

  return (
    <div className="add-address">
      <form onSubmit={handleSubmit} noValidate style={{ textAlign: "right" }}>
        <Row>
          <Col xs="12" md="12">
            <Input
              type={"text"}
              error={formErrors["title"]}
              label={"عنوان"}
              name={"title"}
              placeholder="برنامه نویس بک‌اند"
              value={addressFormData.title}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={"text"}
              error={formErrors["description"]}
              label="توضیحات"
              name={"description"}
              placeholder="توضیحات"
              value={addressFormData.description}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={"text"}
              error={formErrors["employer"]}
              label={"استخدام کننده"}
              name={"employer"}
              placeholder={"استخدام کننده"}
              value={addressFormData.employer}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={"text"}
              error={formErrors["location"]}
              label={"مکان"}
              name={"location"}
              placeholder={"مکان"}
              value={addressFormData.location}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className="add-address-actions">
          <Button type="submit" text="ذخیره شغل" />
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
