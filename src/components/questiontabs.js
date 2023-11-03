import React from "react";
import blob from "../images/blobs.png";
import blob5 from "../images/blob 5.png";
function Questiontabs(props) {
  return (
    <div>
      <img className="blob-up" src={blob5} alt="a blob should be here" />

      <div className="whole-Questions">{props.EachQuestions}</div>
      <img className="blob-down" src={blob} alt="a blob should be here" />
    </div>
  );
}

export default Questiontabs;
