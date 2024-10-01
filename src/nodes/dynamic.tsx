import { memo } from "react";
import { withBaseNode, BaseNodeProps } from "./base"; // 假设路径

function Node(props: BaseNodeProps) {
  const { data } = props.data;

  return (
    <div className="dynamic-node-content">
      {/* 这里根据 data_schema 和 data_ui_schema 动态渲染 UI */}
      <div className="text-lg font-bold">{props.name}</div>
      <div>
        {/* 渲染数据 */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

const DynamicNode = memo(withBaseNode(Node));
export default DynamicNode;
