/**
 *
 * AddressList
 *
 */

import React from "react";

import { Link } from "react-router-dom";

import { AddressIcon, CheckIcon } from "../../Common/Icon";

const AddressList = (props) => {
  const { list, addresses, noHeader } = props;

  return (
    <div className="a-list" style={{ textAlign: "right" }}>
      {list?.map((address, index) => {
        return (
          <Link
            to={noHeader ? "#" : `/dashboard/job/edit/${address._id}`}
            key={index}
            className="d-block"
          >
            <div
              className="d-flex align-items-center mb-3 address-box"
              style={{
                border: "1px solid #f1f1f1",
              }}
            >
              <div className="flex-1 p-3 p-lg-4">
                {address.isDefault ? (
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4 className="mb-0 mr-2 one-line-ellipsis">
                      {address.title}
                    </h4>
                    <CheckIcon className="text-green" />
                  </div>
                ) : (
                  <h4 className="mb-0">{address.title}</h4>
                )}
                <p className="mb-2 address-desc">
                  {`${address?.description} ${address?.location}, ${address?.employer}`}
                </p>
              </div>
              <div className="mx-3">
                <AddressIcon />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AddressList;
