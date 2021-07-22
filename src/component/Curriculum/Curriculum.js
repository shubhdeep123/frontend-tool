import React, { useContext, useState } from "react";
import "./index.scss";
import { ToolContext } from "../../context/index";
import StandardInput from "./StandardInput";
import Heading from "./Heading";
import SubjectBody from "./SubjectBody";

export default function Index() {
  const [currentIndent, setCurrentIndent] = useState("CHAPTER");
  const [newStandard, setNewStandard] = useState("");
  const getConsumer = useContext(ToolContext);
  const { subject } = getConsumer.state;

  return (
    <div className="curriculum-wrapper">
      <div className="subject-heading">
        <b>{subject}</b>
      </div>
      <div className="subjects-wrapper">
        <Heading />
        <SubjectBody setCurrentIndent={setCurrentIndent} />
      </div>
      <StandardInput
        currentIndent={currentIndent}
        setCurrentIndent={setCurrentIndent}
        newStandard={newStandard}
        setNewStandard={setNewStandard}
      />
    </div>
  );
}
