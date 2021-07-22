import React, { useContext, useState} from "react";
import Trash from "../../utils/svg/trash.svg";
import { ToolContext } from "../../context/index";
import MoveButton from "./MoveButton";
import OutdentButton from "./OutdentButton";
import IndentButton from "./IndentButton";

const SubjectBody = ({ setCurrentIndent }) => {
  const getConsumer = useContext(ToolContext);
  const { children, childrenAllIdsOrder } = getConsumer.state;
  const [dragOverIds, setDragOverIds] = useState([]);
  const [dragStartIds, setDragStartIds] = useState([]);
  const chapter = children;
  const chapterAllIds = childrenAllIdsOrder;

  const { HandleChangeStandard, trashStandard, triggerDragDrop } = getConsumer;


  const handleDragOverIds = (ids) => {
    setDragOverIds([...ids]);
  };

  const handleDragDropStartIds = (ids) => {
    setDragStartIds([...ids]);
  };

  const dragDropEndHandler = () => {
    if (dragOverIds.length !== dragStartIds.length) {
      alert(
        "Parent element cannot be a chilren E.g Chapter cannot be Heading or Subheading."
      );
    } else {
      triggerDragDrop(dragStartIds, dragOverIds);
    }
  };

  const setMarginLeft = (standardType) => {
    const UNITS = "em";
    if (standardType === "CHAPTER") return 0 + UNITS;
    else if (standardType === "HEADING") return 1 + UNITS;
    else if (standardType === "SUBHEADING") return 2 + UNITS;

    return "";
  };

  return (
    <div className="subject-body">
      {chapterAllIds.map((chapterId) => {
        const { name } = chapter[chapterId];
        const heading = chapter[chapterId].children;
        const headingAllIds = chapter[chapterId].childrenAllIdsOrder;
        return (
          <div className="subject-box" key={chapterId}>
            <div className="subject-row">
              <div
                className="subject-col"
                onDragOver={() => {
                  handleDragOverIds([chapterId]);
                }}
              >
                <MoveButton
                  chapterId={chapterId}
                  handleDragDropStartIds={handleDragDropStartIds}
                  dragDropEndHandler={dragDropEndHandler}
                />{" "}
                <OutdentButton chapterId={chapterId} />{" "}
                <IndentButton chapterId={chapterId} />{" "}
                <div className="tooltip-wrapper">
                  <img
                    className="cursor-pointer"
                    src={Trash}
                    alt="dustbin"
                    onClick={() => {
                      trashStandard(chapterId);
                      setCurrentIndent("CHAPTER");
                    }}
                  />
                  <span className="tooltiptext">Delete</span>
                </div>
              </div>
              <div className="subject-col">
                <div
                  className="level"
                  style={{ marginLeft: `${setMarginLeft("CHAPTER")}` }}
                />
              </div>
              <div className="subject-col">
                <input
                  className="chapter"
                  type="text"
                  value={name}
                  onChange={(event) => HandleChangeStandard(event, chapterId)}
                />
              </div>
            </div>
            <div className="heading-box">
              {headingAllIds.map((headingId) => {
                const { name } = heading[headingId];
                const subHeadingAllIds = heading[headingId].childrenAllIdsOrder;
                const subHeading = heading[headingId].children;
                return (
                  <React.Fragment key={headingId}>
                    <div className="heading-row" key={headingId}>
                      <div
                        className="heading-col"
                        onDragOver={() => {
                          handleDragOverIds([chapterId, headingId]);
                        }}
                      >
                        <MoveButton
                          chapterId={chapterId}
                          headingId={headingId}
                          handleDragDropStartIds={handleDragDropStartIds}
                          dragDropEndHandler={dragDropEndHandler}
                        />{" "}
                        <OutdentButton
                          chapterId={chapterId}
                          headingId={headingId}
                        />
                        <IndentButton
                          chapterId={chapterId}
                          headingId={headingId}
                        />
                        <div className="tooltip-wrapper">
                          <img
                            className="cursor-pointer"
                            src={Trash}
                            alt="dustbin"
                            onClick={() => {
                              trashStandard(chapterId, headingId);
                              setCurrentIndent("HEADING");
                            }}
                          />
                          <span className="tooltiptext">Delete</span>
                        </div>
                      </div>
                      <div className="heading-col">
                        <div
                          className="level"
                          style={{
                            marginLeft: `${setMarginLeft("HEADING")}`,
                          }}
                        />
                      </div>
                      <div className="heading-col">
                        <input
                          className="heading"
                          type="text"
                          value={name}
                          onChange={(event) =>
                            HandleChangeStandard(event, chapterId, headingId)
                          }
                        />
                      </div>
                    </div>

                    <div className="sub-heading-box">
                      {subHeadingAllIds &&
                        subHeadingAllIds.map((subHeadingId) => {
                          const { name } = subHeading[subHeadingId];
                          return (
                            <div className="sub-heading-row" key={subHeadingId}>
                              <div
                                className="sub-heading-col"
                                onDragOver={() => {
                                  handleDragOverIds([
                                    chapterId,
                                    headingId,
                                    subHeadingId,
                                  ]);
                                }}
                              >
                                <MoveButton
                                  chapterId={chapterId}
                                  headingId={headingId}
                                  subHeadingId={subHeadingId}
                                  handleDragDropStartIds={
                                    handleDragDropStartIds
                                  }
                                  dragDropEndHandler={dragDropEndHandler}
                                />{" "}
                                <OutdentButton
                                  chapterId={chapterId}
                                  headingId={headingId}
                                  subHeadingId={subHeadingId}
                                />
                                <IndentButton
                                  chapterId={chapterId}
                                  headingId={headingId}
                                  subHeadingId={subHeadingId}
                                />
                                <div className="tooltip-wrapper">
                                  <img
                                    className="cursor-pointer"
                                    src={Trash}
                                    alt="dustbin"
                                    onClick={() => {
                                      trashStandard(
                                        chapterId,
                                        headingId,
                                        subHeadingId
                                      );
                                      setCurrentIndent("SUBHEADING");
                                    }}
                                  />
                                  <span className="tooltiptext">Delete</span>
                                </div>
                              </div>
                              <div className="sub-heading-col">
                                <div
                                  className="level"
                                  style={{
                                    marginLeft: `${setMarginLeft(
                                      "SUBHEADING"
                                    )}`,
                                  }}
                                />
                              </div>
                              <div className="sub-heading-col">
                                <input
                                  className="sub-heading"
                                  type="text"
                                  value={name}
                                  onChange={(event) =>
                                    HandleChangeStandard(
                                      event,
                                      chapterId,
                                      headingId,
                                      subHeadingId
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectBody;
