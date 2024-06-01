/**
 *
 * UserList
 *
 */

import React from "react";

import { formatDate } from "../../../utils/date";
import UserRole from "../UserRole";

const UserList = (props) => {
  const { users } = props;

  return (
    <div className="u-list" style={{ textAlign: "right" }}>
      {users.map((user, index) => (
        <div key={index} className="mt-3 px-4 py-3 user-box">
          <label className="text-black">نام</label>
          <p className="fw-medium">
            {user?.firstName ? `${user?.firstName} ${user?.lastName}` : "N/A"}
          </p>
          <label className="text-black">ایمیل</label>
          <p>{user?.email ?? "-"}</p>
          <label className="text-black">زمان عضویت</label>
          <p>{formatDate(user?.created)}</p>
          <label className="text-black">نوع کاربر</label>
          <p className="mb-0">
            <UserRole user={user} className="d-inline-block mt-2" />
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
