import React from "react";

function ProgressBar({ progress }) {
  return (
    <div
      className="progress-bar-container"
      style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "8px" }}
    >
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: "#007bff",
          height: "10px",
          borderRadius: "8px",
          textAlign: "center",
          color: "white",
          lineHeight: "20px",
        }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
