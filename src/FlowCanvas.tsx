import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";

import { StartNode } from "./components/StartNode";
import { ProcessNode } from "./components/ProcessNode";
import { DecisionNode } from "./components/DecisionNode";
import { InputOutputNode } from "./components/InputOutputNode";
import { EndNode } from "./components/EndNode";

export interface CanvasHandle {
  addShape: (type: string) => void;
}

const nodeTypes: NodeTypes = {
  start: StartNode,
  process: ProcessNode,
  decision: DecisionNode,
  inputOutput: InputOutputNode,
  end: EndNode,
};

export const FlowCanvas = React.forwardRef<CanvasHandle>((_, ref) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rfi = useRef<ReactFlowInstance | null>(null);

  const onConnect = useCallback((params: Edge | Connection) => {
    const label = window.prompt("Connector label:", "");
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          label: label || "",
          type: "straight",
          animated: false,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: "#333", strokeWidth: 2 },
          labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
          labelStyle: { fontWeight: "bold" },
        },
        eds
      )
    );
  }, []);

  const addNode = (type: string, position?: { x: number; y: number }) => {
    const id = uuid();
    const labelMap: Record<string, string> = {
      start: "Start",
      process: "Process",
      decision: "Decision?",
      inputOutput: "Input/Output",
      end: "End",
    };
    const fallbackPos = { x: 250, y: 150 };
    const pos = position || rfi.current?.project(fallbackPos) || fallbackPos;

    const newNode: Node = {
      id,
      type,
      position: pos,
      draggable: true,
      data: {
        label: labelMap[type],
        onChange: (val: string) =>
          setNodes((prev) =>
            prev.map((n) =>
              n.id === id
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      label: val,
                      onChange: n.data.onChange,
                    },
                  }
                : n
            )
          ),
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  useImperativeHandle(ref, () => ({ addShape: addNode }));

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!nodeType || !rfi.current || !bounds) return;

    const pos = rfi.current.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    addNode(nodeType, pos);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={wrapperRef} style={{ flex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onInit={(inst) => (rfi.current = inst)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
});
