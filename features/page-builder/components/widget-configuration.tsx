"use client";

import { XCircleIcon } from "lucide-react";
import * as React from "react";

import { CardConfiguration } from "@/features/page-builder/components/ui/card-configuration";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

const widgetConfig: Record<string, React.ReactNode> = {
  Card: <CardConfiguration />,
};

const WidgetConfiguration = ({ widget }: { widget: TWidget }) => {
  const { invalidate } = widgetWrapperStore.getState();
  return (
    <div className="relative z-50 bg-white px-3 py-2">
      <button
        className="my-3 flex w-full items-center justify-between font-bold text-gray-500 hover:text-gray-800"
        onClick={invalidate}
      >
        {widget.name}
        <XCircleIcon className="h-4 w-4" />
      </button>
      {widgetConfig[widget.name] ?? `${widget.name} configuration coming soon`}
    </div>
  );
};

export default WidgetConfiguration;
