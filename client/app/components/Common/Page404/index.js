/**
 *
 * Page404
 *
 */

import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-404">
      <p>
        The page you are looking for was not found. Return to the{" "}
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Page404;
