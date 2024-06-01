/**
 *
 * EditBrand
 *
 */

import React from "react";

import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import Input from "../../Common/Input";
import Button from "../../Common/Button";
import Switch from "../../Common/Switch";
import { ROLES } from "../../../constants";

const EditBrand = (props) => {
  const {
    user,
    brand,
    brandChange,
    formErrors,
    updateBrand,
    deleteBrand,
    activateBrand,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBrand();
  };

  return (
    <div className="edit-brand">
      <form onSubmit={handleSubmit} noValidate style={{ textAlign: "right" }}>
        <Row>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["name"]}
              label={"نام"}
              name={"name"}
              placeholder={"نام برند"}
              value={brand.name}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs="12">
            <Input
              type={"text"}
              error={formErrors["slug"]}
              label={"اسلاگ"}
              name={"slug"}
              placeholder={"اسلاگ برند"}
              value={brand.slug}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12">
            <Input
              type={"textarea"}
              error={formErrors["description"]}
              label={"توضیحات"}
              name={"description"}
              placeholder={"توضیحات برند"}
              value={brand.description}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" md="12" className="mt-3 mb-2">
            <Switch
              style={{ width: 100 }}
              tooltip={brand.isActive}
              tooltipContent={`Disabling ${brand.name} will also disable all ${brand.name} products.`}
              id={`enable-brand-${brand._id}`}
              name={"isActive"}
              label="فعال؟"
              checked={brand.isActive}
              toggleCheckboxChange={(value) => activateBrand(brand._id, value)}
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
            disabled={user.role === ROLES.Merchant}
            onClick={() => deleteBrand(brand._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
