import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export const ProcessNode = ({ data }: any) => {
  const [label, setLabel] = useState(data.label);
  return (
    <div
      style={{
        background: "#EAF0FF",
        border: "2px solid #2980B9",
        padding: 10,
        minWidth: 100,
        textAlign: "center",
      }}
    >
      <Handle type="target" id="input-top" position={Position.Top} />
      <Handle type="target" id="input-left" position={Position.Left} />
      <Handle type="target" id="input-right" position={Position.Right} />
      <Handle type="source" id="output-bottom" position={Position.Bottom} />

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
