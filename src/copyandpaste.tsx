import { ReactNode, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { useSnapshot } from "valtio";
import { useReactFlow } from "@xyflow/react";
import { store, actions } from "./stores/flow";

interface WithCopyPasteProps {
  children: ReactNode;
}

export default function WithCopyPaste({ children }: WithCopyPasteProps) {
  const instance = useReactFlow();

  const mousePositionRef = useRef({ x: 0, y: 0 });

  const snap = useSnapshot(store);

  const onCopy = () => {
    actions.copyToClipboard();
    console.log("copy当前剪贴板", snap.clipboard);
  };

  const onPaste = () => {
    console.log("paste当前剪贴板", snap.clipboard);
    if (window?.document?.querySelector(".react-flow__container") === null) {
      return;
    }

    const rect = window?.document
      ?.querySelector(".react-flow__container")
      ?.getBoundingClientRect();

    // 使用screenToFlowPosition进行坐标转换
    const p = instance.screenToFlowPosition({
      x: mousePositionRef.current.x - (rect?.left || 0),
      y: mousePositionRef.current.y - (rect?.top || 0),
    });

    actions.pasteFromClipboard(p.x, p.y);
  };

  // 注册复制粘贴事件监听器
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // 兼容Mac和其他操作系统
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        onCopy();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "v") {
        onPaste();
      }
    };

    window.addEventListener("keydown", keydownHandler);

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []); // 依赖数组为空，因此这个effect只会在挂载和卸载时运行

  // 注册鼠标移动事件监听器
  useEffect(() => {
    const mousemoveHandler = debounce((e: MouseEvent) => {
      const rect = window?.document
        ?.querySelector(".react-flow__container")
        ?.getBoundingClientRect();

      console.log(
        "最新鼠标的位置",
        {
          x: e.clientX,
          y: e.clientY,
        },
        "flow rect: ",
        rect
      );
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    }, 200);

    window.addEventListener("mousemove", mousemoveHandler);

    // 清理函数，在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("mousemove", mousemoveHandler);
    };
  }, []);

  return <>{children}</>;
}
