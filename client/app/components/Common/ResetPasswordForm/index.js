/**
 *
 * ResetPasswordForm
 *
 */

import React from "react";

import { Row, Col } from "reactstrap";

import Input from "../Input";
import Button from "../Button";

const ResetPasswordForm = (props) => {
  const {
    resetFormData,
    formErrors,
    isToken,
    resetPasswordChange,
    resetPassword,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    resetPassword();
  };

  return (
    <div className="reset-password-form" style={{ textAlign: "right" }}>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs="12" lg="6">
            <Input
              type={"password"}
              error={formErrors["confirmPassword"]}
              label="رمز عبور جدید"
              name={"confirmPassword"}
              placeholder="رمز عبور جدید"
              value={resetFormData.confirmPassword}
              onInputChange={(name, value) => {
                resetPasswordChange(name, value);
              }}
            />
          </Col>
          <Col xs="12" lg="6">
            <Input
              type={"password"}
              error={formErrors["password"]}
              label="رمز عبور"
              name={"password"}
              placeholder={isToken ? "رمز عبور" : "رمز عبور قبلی"}
              value={resetFormData.password}
              onInputChange={(name, value) => {
                resetPasswordChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className="reset-actions">
          <Button type="submit" text="تغییر رمز عبور" />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
