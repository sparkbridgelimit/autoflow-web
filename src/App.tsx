import {
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import "./App.css";
import { useCallback } from "react";
import DynamicNode from "./nodes/dynamic";
import { store, actions } from "./stores/flow";
import WithCopyPaste from "./copyandpaste";
import { useSnapshot } from "valtio";

const nodeTypes = {
  dynamic: DynamicNode,
};

// 校验连接的合法性
const isValidConnection = (connectionOrEdge: Connection | Edge) => {
  if ("source" in connectionOrEdge && "target" in connectionOrEdge) {
    return connectionOrEdge.source !== connectionOrEdge.target;
  }
  return true;
};

function App() {
  const snap = useSnapshot(store);
  const onConnect = useCallback((params: Connection) => {
    const newEdge = addEdge(params, store.edges);
    console.log(newEdge)
    actions.setEdges(newEdge); // 设置新的边集合
  }, []);

  return (
    <>
      <ReactFlowProvider>
        <WithCopyPaste>
          <ReactFlow
            isValidConnection={isValidConnection}
            nodes={snap.nodes}
            edges={snap.edges}
            onNodesChange={actions.onNodesChange}
            onEdgesChange={actions.onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => actions.setSelectedNode(node)}
            onPaneClick={() => actions.setSelectedNode(null)}
            nodeTypes={nodeTypes}
            fitView
            className="bg-teal-50"
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </WithCopyPaste>
      </ReactFlowProvider>
    </>
  );
}

export default App;
