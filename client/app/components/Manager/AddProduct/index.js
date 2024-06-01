/**
 *
 * AddProduct
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";

import { ROLES } from "../../../constants";
import Input from "../../Common/Input";
import Switch from "../../Common/Switch";
import Button from "../../Common/Button";
import SelectOption from "../../Common/SelectOption";

const AddProduct = (props) => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit} noValidate style={{ textAlign: "right" }}>
        <Row>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["name"]}
              label="نام"
              name={"name"}
              placeholder="نام رویداد"
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={"textarea"}
              error={formErrors["description"]}
              label="توضیحات"
              name={"description"}
              placeholder="توضیحات رویداد"
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["location"]}
              label="مکان"
              name={"location"}
              placeholder="مکان رویداد"
              value={productFormData.location}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <SelectOption
              disabled={user.role === ROLES.Merchant}
              error={formErrors["brand"]}
              name={"brand"}
              label="انتخاب دسته"
              value={
                user.role === ROLES.Merchant ? brands[1] : productFormData.brand
              }
              options={brands}
              handleSelectChange={(value) => {
                productChange("brand", value);
              }}
            />
          </Col>
          <Col xs="12" md="12" className="my-2">
            <Switch
              id={"active-product"}
              name={"isActive"}
              label="فعال؟"
              checked={productFormData.isActive}
              toggleCheckboxChange={(value) => productChange("isActive", value)}
            />
          </Col>
        </Row>
        <hr />
        <div className="add-product-actions">
          <Button type="submit" text="دخیره" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
