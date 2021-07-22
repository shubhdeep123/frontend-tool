import React from "react";
import Move from "../../utils/svg/move.svg";

const MoveButton = ({
  chapterId,
  headingId,
  subHeadingId,
  handleDragDropStartIds,
  dragDropEndHandler,
}) => {
  const DragDropValue = chapterId
    ? headingId
      ? subHeadingId
        ? [chapterId, headingId, subHeadingId]
        : [chapterId, headingId]
      : [chapterId]
    : "";

  return (
    <div className="tooltip-wrapper">
      <img
        className="cursor-pointer"
        src={Move}
        alt="move"
        onDragStart={() => {
          handleDragDropStartIds(DragDropValue);
        }}
        onDragEnd={() => {
          dragDropEndHandler();
        }}
      />
      <span className="tooltiptext">Move</span>
    </div>
  );
};

export default MoveButton;
