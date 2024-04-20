import React from "react";

function FloatingActionButton({ isEditMode, toggleEditMode }) {
  return (
    <button
      className="fab"
      onClick={toggleEditMode}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#4FC4E0",
        color: "white",
        border: "none",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
      }}
    >
      {isEditMode ? "💾" : "✏️"}{" "}
      {/* Using emoji for simplicity; replace with icons as needed */}
    </button>
  );
}

export default FloatingActionButton;
