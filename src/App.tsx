import {
  addEdge,
  Connection,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import "./App.css";
import { useCallback } from "react";
import DynamicNode from "./nodes/dynamic";

const initNodes = [
  {
    id: "1",
    type: "dynamic",
    data: {
      data: {
        name: "Jane Doe",
        job: "CEO",
        emoji: "😎",
      },
      inputs: [
        {
          id: "input1",
          name: "Input 1",
          data_type: "json",
          required: false,
        },
        {
          id: "input2",
          name: "Input 2",
          data_type: "json",
          required: false,
        },
      ],
      outputs: [
        {
          id: "output1",
          name: "Output 1",
          data_type: "json",
          display_type: "JSON",
        },
        {
          id: "output2",
          name: "Output 2",
          data_type: "json",
          display_type: "JSON",
        },
      ],
    },
    inputs: [],

    position: { x: 0, y: 50 },
  },
];

const initEdges = [];

const nodeTypes = {
  dynamic: DynamicNode,
};

const isValidConnection = (connection: Connection) => {
  const { source, target } = connection;
  if (source === target) {
    return false;
  }

  return true;
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: unknown) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
      <ReactFlow
        isValidConnection={isValidConnection}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}

export default App;
