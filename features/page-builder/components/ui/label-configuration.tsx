import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutConfiguration } from "@/features/page-builder/components/ui/layout-configuration";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

export const LabelConfiguration = () => {
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
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          type="text"
          value={selectedWidget.props.text ?? ""}
          onChange={(event) => {
            handleChangeProps(selectedWidget!.id, "text", event.target.value);
          }}
        />
      </div>
      <LayoutConfiguration />
    </div>
  );
};
