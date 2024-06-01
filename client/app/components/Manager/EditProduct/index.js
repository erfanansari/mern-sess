/**
 *
 * EditProduct
 *
 */

import React from "react";

import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import { ROLES } from "../../../constants";
import Input from "../../Common/Input";
import Switch from "../../Common/Switch";
import Button from "../../Common/Button";
import SelectOption from "../../Common/SelectOption";

const EditProduct = (props) => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    updateProduct,
    deleteProduct,
    activateProduct,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div className="edit-product">
      <form onSubmit={handleSubmit} noValidate style={{ textAlign: "right" }}>
        <Row>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["name"]}
              label="نام"
              name={"name"}
              placeholder="نام رویداد"
              value={product.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["slug"]}
              label="اسلاگ"
              name={"slug"}
              placeholder="اسلاگ رویداد"
              value={product.slug}
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
              value={product.description}
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
              value={product.location}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          {user.role === ROLES.Admin && (
            <Col xs="12" md="12">
              <SelectOption
                error={formErrors["brand"]}
                label="انتخاب دسته"
                multi={false}
                value={product.brand}
                options={brands}
                handleSelectChange={(value) => {
                  productChange("brand", value);
                }}
              />
            </Col>
          )}
          <Col xs="12" md="12" className="mt-3 mb-2">
            <Switch
              id={`enable-product-${product._id}`}
              name={"isActive"}
              label="فعال؟"
              checked={product?.isActive}
              toggleCheckboxChange={(value) => {
                productChange("isActive", value);
                activateProduct(product._id, value);
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
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
