"use client";

import { Search } from "lucide-react";
import * as React from "react";

import { Input } from "@/components/ui/input";
import WidgetConfiguration from "@/features/page-builder/components/widget-configuration";
import WidgetItem from "@/features/page-builder/components/widget-item";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

type TWidgetItem = {
  name: string;
  isDroppable?: boolean;
};

type TWidgetList = {
  name: string;
  widgets: TWidgetItem[];
};

const layoutWidget: TWidgetItem[] = [
  {
    name: "Center",
    isDroppable: true,
  },
  {
    name: "Container",
    isDroppable: true,
  },
  {
    name: "Space",
    isDroppable: true,
  },
  {
    name: "Stack",
    isDroppable: true,
  },
  {
    name: "Tabs",
    isDroppable: true,
  },
];

const dataEntryWidget: TWidgetItem[] = [
  {
    name: "Input",
  },
  {
    name: "Select",
  },
  {
    name: "TextArea",
  },
  {
    name: "Date",
  },
  {
    name: "Date Range",
  },
  {
    name: "Radio",
  },
  {
    name: "Checkbox",
  },
  {
    name: "Form",
    isDroppable: true,
  },
];

const dataDisplay: TWidgetItem[] = [
  {
    name: "Table",
  },
  {
    name: "List",
  },
  {
    name: "Image",
  },
  {
    name: "Tooltip",
  },
  {
    name: "Card",
    isDroppable: true,
  },
  {
    name: "Calendar",
  },
  {
    name: "Collapse",
    isDroppable: true,
  },
  {
    name: "Chart",
  },
  {
    name: "Carousel",
  },
];

const widgetList: TWidgetList[] = [
  {
    name: "Layout",
    widgets: layoutWidget,
  },
  {
    name: "Data Entry",
    widgets: dataEntryWidget,
  },
  {
    name: "Data Display",
    widgets: dataDisplay,
  },
];

const WidgetList = () => {
  const [search, setSearch] = React.useState("");
  const [selectedWidget, setSelectedWidget] = React.useState<
    TWidget | undefined
  >();

  widgetWrapperStore.subscribe((state) => {
    setSelectedWidget(state.selectedWidget);
  });

  return (
    <div className="h-[calc(100vh-4rem)] w-1/6 overflow-hidden overflow-y-auto border-l">
      {selectedWidget != undefined ? (
        <WidgetConfiguration widget={selectedWidget} />
      ) : (
        <div className="px-3 py-2">
          <div className="relative flex max-w-2xl items-center">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="search..."
              className="pl-8"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {widgetList.map(({ name, widgets }) => (
            <div key={name} className="mt-2">
              <h4 className="px-4 py-2 font-semibold">{name}</h4>
              {widgets
                .filter(({ name }) =>
                  name.toLowerCase().includes(search.toLowerCase()),
                )
                .map(({ name, isDroppable }) => (
                  <WidgetItem
                    key={name}
                    name={name}
                    isDroppable={isDroppable}
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetList;
