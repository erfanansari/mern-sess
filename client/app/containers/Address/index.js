/*
 *
 * Address
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import actions from "../../actions";

import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import Page404 from "../../components/Common/Page404";

class Address extends React.PureComponent {
  componentDidMount() {
    this.props.fetchJobs();
  }

  render() {
    const { jobs } = this.props;
    console.log(jobs);
    return (
      <div className="address-dashboard">
        <Switch>
          {/* <Route
            exact
            path="/dashboard/job"
            component={<List list={filteredJobs} />}
          /> */}
          <Route
            exact
            path="/dashboard/job"
            render={() => <List list={jobs} />}
          />
          <Route exact path="/dashboard/job/edit/:id" component={Edit} />
          <Route exact path="/dashboard/job/add" component={Add} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    jobs: state.jobs.jobs,
    searchedJobs: state.jobs.searchedJobs,
    advancedFilters: state.jobs.advancedFilters,
    isLoading: state.jobs.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Address);
