import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import { TWidget } from "@/features/page-builder/types";

export type WidgetWrapperState = {
  widgets: TWidget[];
  selectedWidget?: TWidget;
  draggedWidget?: TWidget;
  isNewWidget?: boolean;
  isWidgetParentChange?: boolean;
};

export type WidgetWrapperActions = {
  handleDragWidget: (id: string) => void;
  handleDragNewWidget: (name: string, isDroppable?: boolean) => void;
  handleDragEnter: (newParentId?: string) => void;
  handleChangeParent: (parenId?: string) => void;
  handleSwapWidget: (targetId: string) => void;
  handleSelectedWidget: (widgetId: string) => void;
  handleChangeProps: (id: string, key: string, value: any) => void;
  handleChangeStyles: (id: string, key: string, value: any) => void;
  invalidate: () => void;
};

type WidgetWrapperStore = WidgetWrapperState & WidgetWrapperActions;

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const widgetWrapperStore = createStore<WidgetWrapperStore>()(
  immer((set) => ({
    widgets: [],
    handleDragWidget: (id: string) =>
      set((state) => {
        state.draggedWidget = state.widgets.find((widget) => widget.id === id);
      }),
    handleDragNewWidget: (name: string, isDroppable?: boolean) =>
      set((state) => {
        state.draggedWidget = {
          id: uuid(),
          name: name,
          props: {},
          style: {},
          isDroppable: isDroppable,
        };
        state.isNewWidget = true;
      }),
    handleDragEnter: (newParentId?: string) =>
      set((state) => {
        const { draggedWidget, widgets } = state;

        const draggedWidgetId = draggedWidget?.id;

        if (draggedWidget && draggedWidgetId !== newParentId) {
          const foundWidget = widgets.find(
            ({ id }: TWidget) => id === draggedWidgetId,
          );

          if (foundWidget) {
            foundWidget.parentId = newParentId;
            draggedWidget.parentId = newParentId;

            state.isWidgetParentChange = true;
          } else {
            widgets.push(draggedWidget);
          }
        }
      }),
    handleChangeParent: (newParentId?: string) =>
      set((state) => {
        const { draggedWidget, widgets } = state;
        const draggedWidgetId = draggedWidget?.id;

        if (draggedWidget && draggedWidgetId !== newParentId) {
          const foundWidget = widgets.find(({ id }) => id === draggedWidgetId);

          if (foundWidget) {
            foundWidget.parentId = newParentId;
            draggedWidget.parentId = newParentId;

            state.isWidgetParentChange = true;
          } else {
            widgets.push(draggedWidget);
          }
        }
      }),
    handleSwapWidget: (targetId: string) =>
      set((state) => {
        const { draggedWidget, widgets } = state;
        const draggedWidgetId = draggedWidget?.id;
        if (draggedWidgetId) {
          const draggedWidgetIndex = getWidgetIndexById(
            widgets,
            draggedWidgetId,
          );
          const targetWidgetIndex = getWidgetIndexById(widgets, targetId);

          if (
            draggedWidgetIndex !== targetWidgetIndex &&
            draggedWidgetIndex !== -1 &&
            targetWidgetIndex !== -1
          ) {
            swap(widgets, draggedWidgetIndex, targetWidgetIndex);
          }
        }
      }),
    handleSelectedWidget: (widgetId: string) =>
      set((state) => {
        const { widgets } = state;

        state.selectedWidget = widgets.find(({ id }) => id === widgetId);
      }),
    handleChangeProps: (id: string, key: string, value: any) =>
      set((state) => {
        const { widgets } = state;
        const widgetIndex = getWidgetIndexById(widgets, id);
        if (widgetIndex !== -1) {
          state.widgets[widgetIndex].props[key] = value;
          state.selectedWidget!.props[key] = value;
        }
      }),
    handleChangeStyles: (id: string, key: string, value: any) =>
      set((state) => {
        const { widgets } = state;
        const widgetIndex = getWidgetIndexById(widgets, id);
        if (widgetIndex !== -1) {
          state.widgets[widgetIndex].style[key] = value;
          state.selectedWidget!.style[key] = value;
        }
      }),
    invalidate: () =>
      set((state) => {
        state.selectedWidget = undefined;
      }),
  })),
);

const getWidgetIndexById = (widgets: TWidget[], widgetId: string): number => {
  return widgets.findIndex(({ id }) => id === widgetId);
};

const swap = <T>(array: T[], i1: number, i2: number) => {
  [array[i1], array[i2]] = [array[i2], array[i1]];
};
