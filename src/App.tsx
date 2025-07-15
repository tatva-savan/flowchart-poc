import { useRef } from "react";
import { CanvasHandle, FlowCanvas } from "./FlowCanvas";
import { ShapeButtons } from "./components/ShapeButtons";
import { Sidebar } from "./components/Sidebar";

function App() {
  const canvasRef = useRef<CanvasHandle>(null);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ShapeButtons onAdd={(t) => canvasRef.current?.addShape(t)} />
        <FlowCanvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
