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
        صفحه‌ای که دنبالش هستید پیدا نشد. بازگشت به <Link to="/">خانه</Link>
      </p>
    </div>
  );
};

export default Page404;
