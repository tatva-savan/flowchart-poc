import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export const EndNode = ({ data }: any) => {
  const [label, setLabel] = useState(data.label);

  return (
    <div
      style={{
        background: "#FFD6D6",
        border: "2px solid #E74C3C",
        borderRadius: "999px",
        padding: 10,
        minWidth: 80,
        textAlign: "center",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <input
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
          data.onChange?.(e.target.value);
        }}
        style={{
          textAlign: "center",
          background: "transparent",
          border: "none",
          fontWeight: "bold",
          width: "100%",
        }}
      />
    </div>
  );
};
