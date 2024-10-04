import {
  Activity,
  AlarmClockMinus,
  CalendarFold,
  NotepadText,
} from "lucide-react";
import { ReactElement } from "react";

// NodeTplProps 类型定义
type NodeTplProps = {
  name: string;
  description: string;
  icon: ReactElement | null;
  component: string;
  editComponent: string;
  category: string;
  data: Record<string, unknown>;
};

const generals: Record<string, NodeTplProps> = {
  trigger: {
    name: "Trigger",
    description:
      "This is block is the starting point where the workflow will start executing, you can configure how the workflow should be triggered using this block.",
    icon: <Activity />,
    component: "",
    editComponent: "",
    category: "General",
    data: {},
  },
  delay: {
    name: "Delay",
    description: "Delay",
    icon: <AlarmClockMinus />,
    component: "",
    editComponent: "",
    category: "General",
    data: {},
  },
  note: {
    name: "Note",
    description: "Note",
    icon: <NotepadText />,
    component: "",
    editComponent: "",
    category: "General",
    data: {},
  },
};

const browsers: Record<string, NodeTplProps> = {
  "active-tab": {
    name: "Active Tab",
    description: "",
    icon: <CalendarFold />,
    component: "",
    editComponent: "",
    category: "Browser",
    data: {},
  },
  "new-tab": {
    name: "New Tab",
    description: "New Tab",
    icon: <CalendarFold />,
    component: "",
    editComponent: "",
    category: "",
    data: {},
  },
  "test": {
    name: "Test",
    description: "Test",
    icon: <CalendarFold />,
    component: "",
    editComponent: "",
    category: "General",
    data: {},
  },
};

const nodes = [...Object.values(generals), ...Object.values(browsers)];
export default nodes;

type GroupedCategory = {
  category: string;
  items: NodeTplProps[];
};

const groupByCategory = (allNodes: NodeTplProps[]): GroupedCategory[] => {
  const groupedCategories: GroupedCategory[] = allNodes.reduce((acc, item) => {
    const category = item.category || "Uncategorized";

    // 查找现有的组
    let group = acc.find((group) => group.category === category);

    // 如果不存在该类别，创建新的类别组
    if (!group) {
      group = { category, items: [] };
      acc.push(group);
    }

    // 将当前节点添加到类别组
    group.items.push(item);

    return acc;
  }, [] as GroupedCategory[]); // 类型断言，声明累加器的初始类型

  return groupedCategories;
};

export const groups = groupByCategory(nodes);
