import React from "react";

export const Sidebar = () => {
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 150, padding: 10, borderRight: "1px solid #ccc" }}>
      <h4>Drag Shapes</h4>
      {["start", "process", "decision", "inputOutput", "end"].map((t) => (
        <div
          key={t}
          draggable
          onDragStart={(e) => onDragStart(e, t)}
          style={{
            padding: 10,
            marginBottom: 8,
            background: "#f2f2f2",
            cursor: "grab",
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </div>
      ))}
    </aside>
  );
};
