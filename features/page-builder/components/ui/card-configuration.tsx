import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LayoutConfiguration } from "@/features/page-builder/components/ui/layout-configuration";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

export const CardConfiguration = () => {
  const { handleChangeProps, selectedWidget: defaultState } =
    widgetWrapperStore.getState();

  const [selectedWidget, setSelectedWidget] = React.useState<TWidget>(
    defaultState!,
  );

  widgetWrapperStore.subscribe((state) => {
    setSelectedWidget(state.selectedWidget!);
  });

  return (
    <div className="grid gap-3">
      <h4 className="mb-2 text-xl font-bold">Properties</h4>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={selectedWidget.props.title ?? ""}
          onChange={(event) => {
            handleChangeProps(selectedWidget!.id, "title", event.target.value);
          }}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="desc">Description</Label>
        <Textarea
          id="desc"
          value={selectedWidget.props.desc ?? ""}
          onChange={(event) => {
            handleChangeProps(selectedWidget!.id, "desc", event.target.value);
          }}
        />
      </div>
      <LayoutConfiguration />
    </div>
  );
};
