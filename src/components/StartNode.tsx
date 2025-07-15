import { useState } from "react";
import { Handle, Position } from "reactflow";

export const StartNode = ({ data }: any) => {
  const [label, setLabel] = useState(data.label);
  return (
    <div
      style={{
        background: "#DFFFD6",
        border: "2px solid #27AE60",
        borderRadius: "999px",
        padding: 10,
        minWidth: 80,
        textAlign: "center",
      }}
    >
      <Handle id="start-bottom" type="source" position={Position.Bottom} />
      <Handle id="start-top" type="target" position={Position.Top} />
      <Handle id="start-left" type="target" position={Position.Left} />
      <Handle id="start-right" type="target" position={Position.Right} />
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
