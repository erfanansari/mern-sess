/**
 *
 * Events
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";
import List from "../Product/List";
import UserList from "../../components/Manager/UserList";
import SubPage from "../../components/Manager/SubPage";
import UserSearch from "../../components/Manager/UserSearch";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import SearchResultMeta from "../../components/Manager/SearchResultMeta";
import Pagination from "../../components/Common/Pagination";
import NotFound from "../../components/Common/NotFound";

class AllUsers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleUserSearch = (e) => {
    if (e.value.length >= 2) {
      this.props.searchUsers({ name: "user", value: e.value });
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
    const { users, isLoading, searchedUsers, searchUsers, advancedFilters } =
      this.props;
    const loggedUser = this.props.user;

    const { search } = this.state;
    const isSearch = search.length > 0;
    const tempUsers = isSearch ? searchedUsers : users;
    const filteredUsers =
      loggedUser.role === "ROLE ADMIN"
        ? tempUsers
        : tempUsers.filter((user) => user.role !== "ROLE ADMIN");
    const displayPagination = advancedFilters.totalPages > 1;
    const displayUsers = filteredUsers && filteredUsers.length > 0;
    console.log(
      "isSearch ? filteredUsers.length : advancedFilters.count",
      advancedFilters
    );

    return (
      <div className="users-dashboard">
        <SubPage title="کاربران" />
        <UserSearch
          onSearch={this.handleUserSearch}
          onSearchSubmit={searchUsers}
        />
        {isLoading && <LoadingIndicator />}
        {displayUsers && (
          <>
            {!isSearch && displayPagination && (
              <Pagination
                totalPages={advancedFilters.totalPages}
                onPagination={this.handleOnPagination}
              />
            )}
            <SearchResultMeta
              label="کاربر"
              count={
                isSearch
                  ? filteredUsers.length
                  : loggedUser.role === "ROLE ADMIN"
                  ? advancedFilters.count
                  : advancedFilters.count - 1
              }
            />
            <UserList users={filteredUsers} user={loggedUser} />
          </>
        )}
        {!isLoading && !displayUsers && <NotFound message="کاربری پیدا نشد" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    searchedUsers: state.users.searchedUsers,
    advancedFilters: state.users.advancedFilters,
    isLoading: state.users.isLoading,
    user: state.account.user,
  };
};

export default connect(mapStateToProps, actions)(AllUsers);
