import { Edge, EdgeChange, Node, NodeChange, applyNodeChanges, applyEdgeChanges  } from "@xyflow/react";
import { nanoid } from "nanoid";
import { proxy } from 'valtio'

const initNodes: CustomNode[] = [
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
    position: { x: 0, y: 50 },
  },
];

// 定义Node的data字段接口
interface NodeData extends Record<string, unknown> {
  data: {
    name: string;
    job: string;
    emoji: string;
  };
  inputs: Array<{
    id: string;
    name: string;
    data_type: string;
    required: boolean;
  }>;
  outputs: Array<{
    id: string;
    name: string;
    data_type: string;
    display_type: string;
  }>;
}

// 使用Node时包含自定义的NodeData
export type CustomNode = Node<NodeData> & {
  style?: React.CSSProperties;
  className?: string;
  resizing?: boolean;
  focusable?: boolean;
};

export type CustomEdge = Edge;

interface HistoryState {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

interface FlowStoreState {
  nodes: CustomNode[];
  edges: CustomEdge[];
  clipboard: CustomNode | null;
  selectedNode: CustomNode | null;
  history: HistoryState[];
  historyIndex: number;
  maxHistoryLength: number;
}

export const store = proxy<FlowStoreState>({
  nodes: [...initNodes],
  edges: [],
  clipboard: null,
  selectedNode: null,
  history: [],
  historyIndex: 0,
  maxHistoryLength: 100,
})

export const actions = {
  // 设置节点
  setNodes(nodes: CustomNode[]) {
    store.nodes = nodes;
    actions.addHistory();
  },

  // 设置边
  setEdges(edges: CustomEdge[]) {
    store.edges = edges;
    actions.addHistory();
  },

  // 设置剪贴板
  setClipboard(node: CustomNode | null) {
    store.clipboard = node;
  },

  // 设置选中的节点
  setSelectedNode(node: CustomNode | null) {
    store.selectedNode = node;
  },

  // 添加当前状态到历史记录
  addHistory() {
    const { nodes, edges, history, historyIndex } = store;

    // 截断历史记录到当前索引位置，丢弃重做链中的未来状态
    store.history = history.slice(0, historyIndex + 1);

    // 限制最大历史记录长度
    if (store.history.length >= store.maxHistoryLength) {
      store.history.shift(); // 删除最早的历史记录
    } else {
      store.historyIndex += 1; // 只在未删除历史时增加索引
    }

    // 保存当前状态到历史记录中
    store.history.push({
      nodes: [...nodes],
      edges: [...edges],
    });
  },

  // 撤销操作
  undo() {
    if (store.historyIndex > 0) {
      store.historyIndex -= 1;
      const previousState = store.history[store.historyIndex];
      store.nodes = previousState.nodes;
      store.edges = previousState.edges;
    }
  },

  // 重做操作
  redo() {
    if (store.historyIndex < store.history.length - 1) {
      store.historyIndex += 1;
      const nextState = store.history[store.historyIndex];
      store.nodes = nextState.nodes;
      store.edges = nextState.edges;
    }
  },

  // 清空历史记录
  clearHistory() {
    store.history = [];
    store.historyIndex = 0;
  },

  // 
  copyToClipboard() {
    if (store.selectedNode) {
      store.clipboard = { ...store.selectedNode };
      console.log('已复制节点:', store.clipboard);
    } else {
      console.log('没有可复制的节点');
    }
  },

  pasteFromClipboard(x: number, y: number) {
    if (store.clipboard) {
      const newNode = {
        ...store.clipboard,
        id:  nanoid(),  // 新的唯一ID
        position: { x, y },  // 粘贴到指定位置
      };
      store.nodes.push(newNode);  // 添加新节点到nodes中
      console.log('已粘贴节点:', newNode);
    } else {
      console.log('剪贴板为空');
    }
  },
  onNodesChange(changes: NodeChange<CustomNode>[]) {
    store.nodes = applyNodeChanges(changes, store.nodes);

    const selectedChanges = changes.filter((change: NodeChange<CustomNode>) => change.type === 'select');
    if (selectedChanges.length > 0) {
      const selectedNode = store.nodes.find((node) => node.id === selectedChanges[0].id) || null;
      store.selectedNode = selectedNode;  // 更新选中的节点
    }
  },
  // 处理边的变化
  onEdgesChange(changes: EdgeChange<CustomEdge>[]) {
    store.edges = applyEdgeChanges(changes, store.edges);  // 使用applyEdgeChanges更新edges
  },
}