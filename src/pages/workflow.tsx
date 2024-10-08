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
import { useCallback, useRef } from "react";
import DynamicNode from "@/nodes/dynamic";
import { store, actions } from "@/stores/flow";
import WithCopyPaste from "@/copyandpaste";
import { useSnapshot } from "valtio";
import withBaseNode from "@/nodes/base";
import { FlowEdge, FlowNode } from "@/node-types";
import NodePanel from "@/components/node-panel";
import useDrop from "ahooks/lib/useDrop";

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

function Workflow() {
  const snap = useSnapshot(store);
  const onConnect = useCallback((params: Connection) => {
    const newEdge = addEdge(params, store.edges);
    actions.setEdges(newEdge);
  }, []);
  const dropRef = useRef(null);

  useDrop(dropRef, {
    onDom: (content: string, e) => {
      console.log(content, e)
    },
  });

  return (
    <>
      <div
        className="flex w-full min-h-screen"
        style={{ height: "calc(-40px + 100vh)" }}
      >
        <NodePanel />
        <div className="relative flex-1 overflow-auto">
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
                ref={dropRef}
              >
                <MiniMap />
                <Controls />
              </ReactFlow>
            </WithCopyPaste>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}

export default Workflow;
