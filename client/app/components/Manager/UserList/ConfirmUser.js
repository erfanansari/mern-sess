import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../../../constants";

const ConfirmUser = ({ user }) => {
  const toggleConfirm = async () => {
    const res = await axios.put(`${API_URL}/user`, {
      userId: user._id,
      profile: {
        adminConfirmed: !user.adminConfirmed,
      },
    });

    if (res.data.success) {
      window.location.reload();
    }
  };

  return (
    <button
      style={{
        marginTop: "8px",
        background: user.adminConfirmed ? "#99FF99" : "#E6331A",
        borderRadius: "5px",
        padding: "5px 10px",
      }}
      onClick={toggleConfirm}
    >
      <span
        style={{
          color: "#fff !important",
        }}
      >
        {user.adminConfirmed ? "تایید شده" : "تایید نشده"}
      </span>
    </button>
  );
};

export default ConfirmUser;
