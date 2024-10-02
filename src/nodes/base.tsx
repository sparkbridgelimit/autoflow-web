import { ComponentType } from "react";
import { Handle, Position } from "@xyflow/react";
import { CustomNodeData } from "../node-types";

export function withBaseNode<T extends { data: CustomNodeData }>(
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
