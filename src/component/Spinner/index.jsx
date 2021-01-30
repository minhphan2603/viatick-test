import React from "react";
import { Spinner } from "reactstrap";

export default function Spinne({ loading }) {
  return loading ? (
    <div className="loading-container">
      <div className="loading-div">
        <Spinner style={{ width: "3rem", height: "3rem" }} />
      </div>
    </div>
  ) : null;
}
