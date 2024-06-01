/**
 *
 * EventSearch
 *
 */

import React from "react";

import SearchBar from "../../Common/SearchBar";

const EventSearch = (props) => {
  return (
    <div className="mb-3">
      <SearchBar
        name="event"
        placeholder="عنوان رویداد را وارد کنید"
        btnText="جستجو"
        onSearch={props.onSearch}
        onBlur={props.onBlur}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default EventSearch;
