import React, { useContext } from "react";
import { ToolContext } from "../../context/index";
import Trash from "../../utils/svg/trash.svg"
import MoveButton from "./MoveButton";
import OutdentButton from "./OutdentButton";
import IndentButton from "./IndentButton";


const StandardInput = ({
  currentIndent,
  setCurrentIndent,
  newStandard,
  setNewStandard,
}) => {
  const getConsumer = useContext(ToolContext);
  const { addStandard,trashStandard } = getConsumer;

  const setMarginLeft = (standardType) => {
    const UNITS = "em";
    if (standardType === "CHAPTER") return 0 + UNITS;
    else if (standardType === "HEADING") return 1 + UNITS;
    else if (standardType === "SUBHEADING") return 2 + UNITS;

    return "";
  };

  const handleStandardSummit = (event) => {
    event.preventDefault();
    addStandard(currentIndent, newStandard);
    setNewStandard("");
  };

  return (
    <div className="enter-standard">
      <form onSubmit={handleStandardSummit}>
        <div className="standard-row">
          <div className="standard-col">
            <MoveButton />{" "}
            <OutdentButton
              currentIndent={currentIndent}
              setCurrentIndent={setCurrentIndent}
            />{" "}
            <IndentButton
              currentIndent={currentIndent}
              setCurrentIndent={setCurrentIndent}
            />{" "}
            <div className="tooltip-wrapper">
              <img
                className="cursor-pointer"
                src={Trash}
                alt="dustbin"
                onClick={() => trashStandard()}
              />
              <span className="tooltiptext">Delete</span>
            </div>{" "}
          </div>
          <div className="standard-col">
            <div
              className="level"
              style={{ marginLeft: `${setMarginLeft(currentIndent)}` }}
            />
          </div>
          <div className="standard-col">
            <input
              className={
                currentIndent === "CHAPTER"
                  ? "chapter"
                  : currentIndent === "HEADING"
                  ? "heading"
                  : "sub-heading"
              }
              type="text"
              placeholder="Enter the required standard. E.g Algebra "
              required
              autoFocus
              value={newStandard}
              onChange={(e) => setNewStandard(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit" className="add-standard">
            Add a standard &#10010;
          </button>
        </div>
      </form>
    </div>
  );
};

export default StandardInput;
