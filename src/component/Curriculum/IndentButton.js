import React, { useContext } from "react";
import RightArrow from "../../utils/svg/right-arrow.svg";
import { ToolContext } from "../../context/index";

const IndentButton = ({
  chapterId,
  headingId,
  subHeadingId,
  currentIndent,
  setCurrentIndent,
}) => {
  const getConsumer = useContext(ToolContext);
  const { handleIndent } = getConsumer;

  const indentValue = chapterId
    ? headingId
      ? subHeadingId
        ? `${chapterId},${headingId},${subHeadingId}`
        : `${chapterId},${headingId}`
      : `${chapterId}`
    : null;

  const changeIndentInput = () => {
    if (currentIndent === "CHAPTER") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("SUBHEADING");
  };
  return (
    <div className="tooltip-wrapper">
      <img
        className="cursor-pointer"
        src={RightArrow}
        alt="right indent"
        onClick={() => {
          indentValue ? handleIndent(indentValue) : changeIndentInput();
        }}
      />{" "}
      <span className="tooltiptext">Indent</span>
    </div>
  );
};

export default IndentButton;
