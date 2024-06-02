/**
 *
 * Homepage
 *
 */

import { Link } from "react-router-dom";
import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../actions";
import banners from "./banners.json";
import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";
import List from "../Address/List";
import JobSearch from "../../components/Manager/JobSearch";
import SubPage from "../../components/Manager/SubPage";
import NotFound from "../../components/Common/NotFound";
import LoadingIndicator from "../../components/Common/LoadingIndicator";

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  handleJob = (e) => {
    if (e.value.length >= 2) {
      this.props.searchJobs({ name: "job", value: e.value });
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
    this.props.fetchJobs(v);
  };

  render() {
    const { jobs, searchJobs, searchedJobs, isLoading, advancedFilters } =
      this.props;
    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredJobs = isSearch ? searchedJobs : jobs;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayJobs = filteredJobs && filteredJobs.length > 0;
    console.log({ filteredJobs });

    return (
      <div
        className="homepage"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubPage title="رویداد ها" />
        <JobSearch onSearch={this.handleJob} onSearchSubmit={searchJobs} />
        {isLoading && <LoadingIndicator />}
        <List list={filteredJobs} noHeader />
        {!isLoading && !displayJobs && <NotFound message="شغلی پیدا نشد" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    jobs: state.jobs.jobs,
    searchedJobs: state.jobs.searchedJobs,
    advancedFilters: state.jobs.advancedFilters,
    isLoading: state.jobs.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
