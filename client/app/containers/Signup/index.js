/*
 *
 * Signup
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import actions from "../../actions";

import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import Checkbox from "../../components/Common/Checkbox";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

class Signup extends React.PureComponent {
  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      isSubscribed,
      signupChange,
      signUp,
      // signOut,
      // signUpSuccess,
      subscribeChange,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const handleSubmit = (event) => {
      event.preventDefault();
      signUp();
      // signUpSuccess()
    };

    return (
      <div className="signup-form">
        {isLoading && <LoadingIndicator />}
        <h2>ثبت نام</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs={{ size: 12, order: 2 }} className="p-0">
              <Col xs="12" md="12">
                <Input
                  type={"text"}
                  error={formErrors["email"]}
                  label={"آدرس ایمیل"}
                  name={"email"}
                  placeholder={"ایمیل خود را وارد کنید"}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={"text"}
                  error={formErrors["firstName"]}
                  label={"نام"}
                  name={"firstName"}
                  placeholder={"نام خود را وارد کنید"}
                  value={signupFormData.firstName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={"text"}
                  error={formErrors["lastName"]}
                  label={"نام خانوادگی"}
                  name={"lastName"}
                  placeholder={"نام خانوادگی خود را وارد کنید"}
                  value={signupFormData.lastName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={"password"}
                  label={"رمز عبور"}
                  error={formErrors["password"]}
                  name={"password"}
                  placeholder={"رمز عبور خود را وارد کنید"}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <Link className="mt-3 mt-md-0 redirect-link" to={"/login"}>
              بازگشت به صفحه ورود
            </Link>
            <Button
              type="submit"
              variant="primary"
              text="ثبت نام"
              disabled={isSubmitting}
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
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed,
  };
};

export default connect(mapStateToProps, actions)(Signup);
