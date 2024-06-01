/*
 *
 * Login
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import actions from "../../actions";

import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

class Login extends React.PureComponent {
  render() {
    const {
      authenticated,
      loginFormData,
      loginChange,
      login,
      formErrors,
      isLoading,
      isSubmitting,
    } = this.props;

    if (authenticated) return <Redirect to="/dashboard" />;

    const registerLink = () => {
      this.props.history.push("/register");
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      login();
    };

    return (
      <div className="login-form">
        {isLoading && <LoadingIndicator />}
        <h2>ورود</h2>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col xs={{ size: 12, order: 2 }} className="p-0">
              <Col xs="12" md="12">
                <Input
                  type={"text"}
                  error={formErrors["email"]}
                  label={"ادرس ایمیل"}
                  name={"email"}
                  placeholder={"ایمیل خود را وارد کنید"}
                  value={loginFormData.email}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </Col>
              <Col xs="12" md="12">
                <Input
                  type={"password"}
                  error={formErrors["password"]}
                  label={"رمز عبور"}
                  name={"password"}
                  placeholder={"رمز عبور خود را وارد کنید"}
                  value={loginFormData.password}
                  onInputChange={(name, value) => {
                    loginChange(name, value);
                  }}
                />
              </Col>
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-0">
              <Button
                text="ساخت اکانت"
                variant="link"
                // className="ml-md-3"
                onClick={registerLink}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              text="ورود"
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
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,
  };
};

export default connect(mapStateToProps, actions)(Login);
