/**
 *
 * Events
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";
import List from "../Product/List";
import SubPage from "../../components/Manager/SubPage";
import EventSearch from "../../components/Manager/EventSearch";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

class Events extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  handleEvent = (e) => {
    if (e.value.length >= 2) {
      this.props.searchEvents({ name: "event", value: e.value });
      this.setState({
        search: e.value,
      });
    } else {
      this.setState({
        search: "",
      });
    }
  };

  handleOnPagination = (n, v) => {
    this.props.fetchUsers(v);
  };

  render() {
    const { searchEvents } = this.props;
    return (
      <>
        <SubPage title="رویداد ها" />
        <EventSearch
          onSearch={this.handleEvent}
          onSearchSubmit={searchEvents}
        />
        <List noHeader />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.storeProducts,
    advancedFilters: state.events.advancedFilters,
    searchEvents: state.events.searchEvents,
    searchedEvents: state.events.searchedEvents,
    isLoading: state.events.isLoading,
    user: state.account.user,
  };
};

export default connect(mapStateToProps, actions)(Events);
