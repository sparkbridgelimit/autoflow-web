import { groups } from "@/data/nodes";
import { Home, Plus, Minus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export default function NodePanel() {
  // 使用 useState 控制哪个分组是展开的
  const [openGroup, setOpenGroup] = useState<string | null>(groups[0].category); // 默认展开第一组

  const handleToggle = (category: string) => {
    setOpenGroup(openGroup === category ? null : category); // 如果点击的是当前展开的分组，则收起
  };

  return (
    <>
      <div className="hidden md:flex w-80 flex-col border-l border-gray-100 p-4 bg-white dark:border-gray-700 dark:border-opacity-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="text-xl font-semibold">test</span>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search... (⌘+f)"
            className="w-full px-4 py-2 bg-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none"
          />
        </div>
        {groups.map((group) => (
          <Collapsible
            key={group.category}
            open={openGroup === group.category}
            onOpenChange={() => handleToggle(group.category)}
            className="mt-6"
          >
            <div className="flex items-center justify-between space-x-2 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-500 font-medium">
                  {group.category}
                </span>
              </div>
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer">
                  {openGroup === group.category ? (
                    <Minus className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Plus className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-slate-100 p-4 rounded-md shadow-sm flex flex-col cursor-pointer hover:bg-slate-200"
                  >
                    <div>{item.icon}</div>
                    <div className="mt-2 select-none">{item.name}</div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </>
  );
}
