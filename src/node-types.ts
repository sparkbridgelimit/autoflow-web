import { Node, Edge, NodeProps } from "@xyflow/react";

type Endpoint = {
  id: string;
  label?: string;
  name?: string;
  data_type: string;
  required?: boolean;
  display_type?: string;
};

export type CustomNodeData = {
  data: Record<string, unknown>;
  inputs: Endpoint[];
  outputs: Endpoint[];
};

export type CustomNode = Node<CustomNodeData, 'custom'>;

export type DynamicNodeProps = NodeProps<CustomNode>;

export type FlowNode = Node<CustomNodeData>;

export type FlowEdge = Edge;