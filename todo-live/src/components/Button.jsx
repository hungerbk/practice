import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button type="button" className="click-button" onClick={onClick}>
      {text}
    </button>
  );
}
