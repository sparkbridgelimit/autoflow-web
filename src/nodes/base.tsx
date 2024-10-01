import { ComponentType } from "react";
import { Handle, Position } from "@xyflow/react";

export interface Endpoint {
  id: string;
  name: string;
  description: string;
  required: boolean;
  data_type: string;
  display_type: string;
}

export interface BaseNodeDataProps {
  data: Record<string, unknown>;
  inputs: Endpoint[];
  outputs: Endpoint[];
}

export interface BaseNodeProps {
  id: string;
  name: string;
  node_type: string;
  component: string;
  status: string;
  data: BaseNodeDataProps;
}

export function withBaseNode<T extends BaseNodeProps>(
  WrappedComponent: ComponentType<T>
) {
  return function BaseNodeWrapper(props: T) {
    const { inputs, outputs } = props.data;
    return (
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-1 border-stone-400">
        {/* 渲染输入端点 */}
        {inputs.map((input, index) => (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{ top: `${index * 20 + 10}px` }}
            className="w-2 h-2 !bg-teal-500 rounded-lg"
          />
        ))}

        {outputs.map((output, index) => (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={output.id}
            style={{ top: `${index * 20 + 10}px` }}
            className="w-2 h-2 !bg-teal-500 rounded-lg"
          />
        ))}

        {/* 包装内容 */}
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default withBaseNode;
