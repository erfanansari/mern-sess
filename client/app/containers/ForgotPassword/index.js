/*
 *
 * ForgotPassword
 *
 */

import React from "react";
import { connect } from "react-redux";

import { Row, Col } from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import actions from "../../actions";

import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      authenticated,
      forgotFormData,
      formErrors,
      forgotPasswordChange,
      forgotPassowrd,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const handleSubmit = (event) => {
      event.preventDefault();
      forgotPassowrd();
    };

    return (
      <div className="forgot-password-form">
        <h3>فراموشی رمز عبور</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs="12" md="12">
              <Input
                type={"text"}
                error={formErrors["email"]}
                label={"آدرس ایمیل"}
                name={"email"}
                placeholder={"ایمیل خود را وارد کنید"}
                value={forgotFormData.email}
                onInputChange={(name, value) => {
                  forgotPasswordChange(name, value);
                }}
              />
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <Link className="redirect-link" to={"/login"}>
              بازگشت به صفحه ورود
            </Link>
            <Button
              type="submit"
              variant="primary"
              text="ارسال ایمیل"
              className="mb-3 mb-md-0"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors,
  };
};

export default connect(mapStateToProps, actions)(ForgotPassword);
