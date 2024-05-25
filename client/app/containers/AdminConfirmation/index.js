/*
 *
 * AdminConfirmation
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';

class AdminConfirmation extends React.PureComponent {
  render() {
    return (
      <div className='address-dashboard'>
        <h1 style={{
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            marginTop: '50px'
            }}>
            Your account is not confirmed yet. Please wait for the admin to confirm your account.
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(AdminConfirmation);
