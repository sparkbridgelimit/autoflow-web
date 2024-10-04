import { useRef } from "react";
import { NodeTplProps } from "@/data/nodes";
import useDrag from "ahooks/lib/useDrag";

export default function NodeItem({ name, data, icon }: NodeTplProps) {
  const dragRef = useRef(null);

  useDrag(data, dragRef);

  return (
    <>
      <div
        ref={dragRef}
        key={name}
        className="bg-slate-100 p-4 rounded-md shadow-sm flex flex-col cursor-pointer hover:bg-slate-200"
      >
        <div>{icon}</div>
        <div className="mt-2 select-none">{name}</div>
      </div>
    </>
  );
}
