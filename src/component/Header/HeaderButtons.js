import React, { useContext } from "react";
import "./index.scss";
import { ToolContext } from "../../context/index";
const HeaderButtons = () => {
  const getConsumer = useContext(ToolContext);
  const { state, getJSONData } = getConsumer;

  const handleFileChange = async (e) => {
    const { name } = e.target.files[0];
    if (name.endsWith(".json")) {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        getJSONData(JSON.parse(text));
      };

      reader.readAsText(e.target.files[0]);
    } else {
      alert(
        "It is not a JSON file. kindly Upload a file having .json extension."
      );
    }
  };

  const blob = new Blob([JSON.stringify(state)], { type: "text/json" });

  return (
    <div className="header-buttons-wrapper">
      <span className="upload-wrapper">
        <label htmlFor="fusk">Upload JSON</label>
        <input
          id="fusk"
          type="file"
          name="JSONFile"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </span>{" "}
      <a
        className="save-wrapper"
        href={URL.createObjectURL(blob)}
        download="API.json"
      >
        Download JSON
      </a>
    </div>
  );
};

export default HeaderButtons;
