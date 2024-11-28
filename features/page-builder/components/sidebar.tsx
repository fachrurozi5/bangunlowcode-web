"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WidgetConfiguration from "@/features/page-builder/components/widget-configuration";
import WidgetList from "@/features/page-builder/components/widget-list";
import WidgetStructure from "@/features/page-builder/components/widget-structure";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

const Sidebar = () => {
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
        <Tabs className="mx-2 mt-3" defaultValue="list">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Widgets</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <WidgetList />
          </TabsContent>
          <TabsContent value="structure">
            <WidgetStructure />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Sidebar;
