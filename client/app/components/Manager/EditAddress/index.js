/**
 *
 * Edit Address
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";

import Checkbox from "../../Common/Checkbox";
import Input from "../../Common/Input";
import Button from "../../Common/Button";

const EditAddress = (props) => {
  const { address, addressChange, formErrors, updateAddress, deleteAddress } =
    props;

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAddress();
  };

  return (
    <div className="edit-address">
      <form onSubmit={handleSubmit} noValidate style={{ textAlign: "right" }}>
        <Row>
          <Col xs="12" md="12">
            <Input
              type={"text"}
              error={formErrors["title"]}
              label="عنوان"
              name={"title"}
              placeholder="عنوان"
              value={address.title}
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
              value={address.description}
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
              value={address.employer}
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
              value={address.location}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className="d-flex flex-column flex-md-row">
          <Button
            type="submit"
            text="ذخیره"
            className="mb-3 mb-md-0 mr-0 mr-md-3"
          />
          <Button
            variant="danger"
            text="حذف"
            onClick={() => deleteAddress(address._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
