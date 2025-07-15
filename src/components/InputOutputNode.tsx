import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputOutputNode = ({ data }: any) => {
  const [label, setLabel] = useState(data.label);

  return (
    <div
      style={{
        width: 140,
        height: 60,
        background: "#E0F7FA",
        border: "2px solid #00ACC1",
        transform: "skewX(-20deg)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          transform: "skewX(20deg)",
          width: "90%",
          background: "transparent",
          border: "none",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1,
        }}
      />
    </div>
  );
};
