import React, { useState } from "react";
import { Handle, Position } from "reactflow";

interface Props {
  data: { label: string; onChange?: (val: string) => void };
}

export const DecisionNode: React.FC<Props> = ({ data }) => {
  const [label, setLabel] = useState(data.label);
  const size = 120;
  const h = size / 2;

  const diamondPoints = `${h},0 ${size},${h} ${h},${size} 0,${h}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    data.onChange?.(e.target.value);
  };

  const sides: { side: Position; left?: number; top?: number }[] = [
    { side: Position.Top, left: h, top: 0 },
    { side: Position.Right, left: size, top: h },
    { side: Position.Bottom, left: h, top: size },
    { side: Position.Left, left: 0, top: h },
  ];

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <polygon
          points={diamondPoints}
          fill="#FFF4D6"
          stroke="#F1C40F"
          strokeWidth={2}
        />
      </svg>

      {sides.map(({ side, left, top }) => (
        <Handle
          key={side}
          id={`${side}-${side === Position.Top ? "target" : "source"}`}
          type={side === Position.Top ? "target" : "source"}
          position={side}
          style={{
            position: "absolute",
            left,
            top,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <input
        value={label}
        onChange={handleChange}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          width: "80%",
          textAlign: "center",
          background: "transparent",
          border: "none",
          fontWeight: "bold",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
};
