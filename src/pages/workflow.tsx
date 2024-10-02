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
import { useCallback } from "react";
import DynamicNode from "@/nodes/dynamic";
import { store, actions } from "@/stores/flow";
import WithCopyPaste from "@/copyandpaste";
import { useSnapshot } from "valtio";
import withBaseNode from "@/nodes/base";
import { FlowEdge, FlowNode } from "@/node-types";

const nodeTypes = {
  dynamic: withBaseNode(DynamicNode),
};

// 校验连接的合法性
const isValidConnection = (connectionOrEdge: Connection | Edge) => {
  if ("source" in connectionOrEdge && "target" in connectionOrEdge) {
    return connectionOrEdge.source !== connectionOrEdge.target;
  }
  return true;
};

function Workflow () {
  const snap = useSnapshot(store);
  const onConnect = useCallback((params: Connection) => {
    const newEdge = addEdge(params, store.edges);
    actions.setEdges(newEdge);
  }, []);

  return (
    <>
      <ReactFlowProvider>
        <WithCopyPaste>
          <ReactFlow
            isValidConnection={isValidConnection}
            nodes={snap.nodes as FlowNode[]}
            edges={snap.edges as FlowEdge[]}
            onNodesChange={actions.onNodesChange}
            onEdgesChange={actions.onEdgesChange}
            onConnect={onConnect}
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

export default Workflow;
