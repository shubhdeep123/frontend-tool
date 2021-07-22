import React, { useContext } from "react";
import LeftArrow from "../../utils/svg/left-arrow.svg";
import { ToolContext } from "../../context/index";

const OutdentButton = ({
  chapterId,
  headingId,
  subHeadingId,
  currentIndent,
  setCurrentIndent,
}) => {
  const getConsumer = useContext(ToolContext);
  const { handleOutdent } = getConsumer;

  const outdentValue = chapterId
    ? headingId
      ? subHeadingId
        ? `${chapterId},${headingId},${subHeadingId}`
        : `${chapterId},${headingId}`
      : `${chapterId}`
    : null;

  const changeOutdentInput = () => {
    if (currentIndent === "SUBHEADING") setCurrentIndent("HEADING");
    else if (currentIndent === "HEADING") setCurrentIndent("CHAPTER");
  };

  return (
    <div className="tooltip-wrapper">
      <img
        className="cursor-pointer"
        src={LeftArrow}
        alt="left indent"
        onClick={() => {
          outdentValue ? handleOutdent(outdentValue) : changeOutdentInput();
        }}
      />
      <span className="tooltiptext">Outdent</span>
    </div>
  );
};

export default OutdentButton;
