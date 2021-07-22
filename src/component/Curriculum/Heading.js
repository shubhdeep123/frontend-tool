import React from "react";

const Heading = () => {
  return (
    <div className="subjects-heading">
      <div className="heading-wrapper">
        <div
          className="main-heading"
          style={{ position: "relative", right: "2em" }}
        >
          Actions
        </div>
        <div
          className="sub-heading"
          style={{ position: "relative", right: "2em" }}
        >
          Move, Indent, Outdent, Delete{" "}
        </div>
      </div>
      <div className="heading-wrapper">
        <div className="main-heading">Standard</div>
        <div
          className="sub-heading"
          style={{ position: "relative", left: "2.5em" }}
        >
          The text of the standard
        </div>
      </div>
    </div>
  );
};

export default Heading;
