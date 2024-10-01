"use client";

import { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  ConnectionMode,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from "reactflow";
import { RFStore, useStore } from "@/store/flow";
import { shallow } from "zustand/shallow";
import Toolbar from "@/components/toolbar";
import AskNode from "@/components/node/AskNode";
import FloatingEdge from "./FloatingEdge";
import { FlowInfo } from "@/types/Flow";
import ZoomControlls from "@/components/ZoomControlls";
import RedoUndoControlls from "@/components/RedoUndoControlls";
import flowConfig from "@/config/flow";
import WithCopyPaste from "@/components/WithCopyAndPaste";
import "@/components/flow/style.css";

const selector = (store: RFStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  initHistory: store.initHistory,
  addInitNode: store.addInitNode,
  addChildNodes: store.addChildNodes,
  setSelectedNode: store.setSelectedNode,
});

// Flow 组件的 props 类型
interface FlowProps {
  flowInfo: FlowInfo;
}

const flow = ({ flowInfo }: FlowProps) => {
  const store = useStore(selector, shallow);
  const nodeTypes = useMemo(() => ({ ask_node: AskNode }), []);
  const edgeTypes = useMemo(() => ({ floating_edge: FloatingEdge }), []);

  const getQuestion = useCallback(() => {
    const question = prompt();
    question && store.addInitNode(question);
  }, []);

  useEffect(() => {
    store.initHistory();
    store.addInitNode("线性代数学习");
  }, []);

  return (
    <>
      <main
        style={{ width: "100vw", height: "100vh" }}
        className="relative flow-container"
      >
        <ReactFlowProvider>
          <WithCopyPaste>
            <ReactFlow
              nodes={store.nodes}
              edges={store.edges}
              onNodesChange={store.onNodesChange}
              onEdgesChange={store.onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={flowConfig.fitViewOptions}
              connectionMode={ConnectionMode.Loose}
              onNodeClick={(_, node) => store.setSelectedNode(node)}
              onPaneClick={() => store.setSelectedNode(null)}
              className="bg-teal-50"
            >
              <Panel position="top-left">
                <button className="action-btn" onClick={() => getQuestion()}>
                  添加问题
                </button>
              </Panel>
              <Panel position="top-center">
                <Toolbar />
              </Panel>
              <Panel position="top-right">
                <button className="action-btn">保存</button>
              </Panel>
              <Panel position="bottom-left">
                <div className="flex space-x-2">
                  <ZoomControlls />
                  <RedoUndoControlls />
                </div>
              </Panel>
              <Background
                id="1"
                gap={10}
                color="#f1f1f1"
                variant={BackgroundVariant.Lines}
              />
              <Background
                id="2"
                gap={100}
                offset={1}
                color="#ccc"
                variant={BackgroundVariant.Lines}
              />
              <MiniMap />
            </ReactFlow>
          </WithCopyPaste>
        </ReactFlowProvider>
      </main>
    </>
  );
};

export default flow;
