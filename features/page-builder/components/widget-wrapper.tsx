"use client";

import * as React from "react";

import WidgetBuilder from "@/features/page-builder/components/widget-builder";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

const WidgetWrapper = () => {
  const [widgets, setWidgets] = React.useState<TWidget[]>([]);
  const { handleDragEnter, invalidate } = widgetWrapperStore.getState();

  widgetWrapperStore.subscribe((state) => {
    setWidgets(state.widgets);
  });

  return (
    <div
      className="flex-1"
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => {
        event.preventDefault();
        handleDragEnter();
      }}
      onDrop={() => {
        invalidate();
      }}
    >
      <WidgetBuilder widgets={widgets} />
    </div>
  );
};

export default WidgetWrapper;
