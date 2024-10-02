import { DynamicNodeProps } from '../node-types';


function DynamicNode(props: DynamicNodeProps) {
  const { data, selected } = props;

  return (
    <div className={`dynamic-node-content ${selected ? 'selected' : ''}`}>
      <div>
        {/* 渲染自定义数据 */}
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default DynamicNode;
