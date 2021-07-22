import React, { useContext } from "react";
import Trash from "../../utils/svg/trash.svg";
import { ToolContext } from "../../context/index";

const DeleteButton = ({
  chapterId,
  headingId,
  subHeadingId,
  // setCurrentIndent,
}) => {
  const getConsumer = useContext(ToolContext);
  const { trashStandard } = getConsumer;

  const trashValue = chapterId
    ? headingId
      ? subHeadingId
        ? `${chapterId},${headingId},${subHeadingId}`
        : `${chapterId},${headingId}`
      : `${chapterId}`
    : null;

  console.log("trash value", trashValue);

  // const changeCurrentIndentValue = () => {
  //   const indentValue = chapterId
  //     ? headingId
  //       ? subHeadingId
  //         ? "SUBHEADING"
  //         : "HEADING"
  //       : "CHAPTER"
  //     : "";

  //   console.log("indent value", indentValue);

  //   indentValue && setCurrentIndent(indentValue);
  // };

  return (
    <div className="tooltip-wrapper">
      <img
        className="cursor-pointer"
        src={Trash}
        alt="dustbin"
        onClick={() => {
          trashValue && trashStandard(trashValue);
          console.log("delete is called");
        }}
      />
      <span className="tooltiptext">Delete</span>
    </div>
  );
};

export default DeleteButton;
