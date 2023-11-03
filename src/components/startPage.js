import React from "react";
import blob from "../images/blobs.png";
import blob5 from "../images/blob 5.png";

function startPage(props) {
  return (
    <div id="startPage-container">
      <img className="blob-up" src={blob5} alt="a blob should be here" />

      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.onClick}> Start quiz</button>
      <img className="blob-down" src={blob} alt="a blob should be here" />
    </div>
  );
}
export default startPage;
