"use client";

import * as React from "react";

import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";

type Props = {
  name: string;
  isDroppable?: boolean;
};

const WidgetItem = ({ name, isDroppable }: Props) => {
  const handleDragWidget = widgetWrapperStore.getState().handleDragNewWidget;
  return (
    <div
      onDragStart={(e) => {
        handleDragWidget(name, isDroppable);
      }}
      className="rounded-md px-4 py-2 text-sm text-gray-800 hover:bg-gray-800 hover:text-white"
      draggable
    >
      {name}
    </div>
  );
};

export default WidgetItem;
