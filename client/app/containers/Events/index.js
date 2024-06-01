/**
 *
 * Events
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";
import List from "../Product/List";

class Events extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add("Events-page");
  }

  componentWillUnmount() {
    document.body.classList.remove("Events-page");
  }

  render() {
    return <List noHeader />;
  }
}

const mapStateToProps = (state) => {
  return {
    advancedFilters: state.product.advancedFilters,
    products: state.product.storeProducts,
  };
};

export default connect(mapStateToProps, actions)(Events);
