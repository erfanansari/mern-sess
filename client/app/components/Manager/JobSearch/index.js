/**
 *
 * JobSearch
 *
 */

import React from "react";

import SearchBar from "../../Common/SearchBar";

const JobSearch = (props) => {
  return (
    <div className="mb-3">
      <SearchBar
        name="job"
        placeholder="عنوان شغل را وارد کنید"
        btnText="جستجو"
        onSearch={props.onSearch}
        onBlur={props.onBlur}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default JobSearch;
