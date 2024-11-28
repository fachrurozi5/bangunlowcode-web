import * as React from "react";

import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

const WidgetStructure = ({ parentId }: { parentId?: string }) => {
  const { widgets: defaultState } = widgetWrapperStore.getState();

  const [widgets, setWidgets] = React.useState<TWidget[]>(defaultState);

  widgetWrapperStore.subscribe((state) => {
    setWidgets(state.widgets);
  });

  return (
    <ul className="tree">
      {widgets
        .filter((widget) => widget.parentId == parentId)
        .map((widget: TWidget) =>
          widgets.find((find) => find.parentId == widget.id) == undefined ? (
            <ListItem key={widget.id} widget={widget}>
              {widget.name}
            </ListItem>
          ) : (
            <ListItem key={widget.id} widget={widget}>
              <details open>
                <summary>{widget.name}</summary>
                <WidgetStructure parentId={widget.id} />
              </details>
            </ListItem>
          ),
        )}
    </ul>
  );
};

const ListItem = ({
  children,
  widget,
}: {
  children: React.ReactNode;
  widget: TWidget;
}) => {
  const { handleDragWidget, handleSwapWidget, handleChangeParent } =
    widgetWrapperStore.getState();

  return (
    <li
      key={widget.id}
      onDragStart={(event) => {
        event.stopPropagation();
        handleDragWidget(widget.id);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => {
        event.stopPropagation();
        if (widget.isDroppable) {
          handleChangeParent(widget.id);
        } else {
          handleSwapWidget(widget.id);
        }
      }}
      draggable
    >
      {children}
    </li>
  );
};

export default WidgetStructure;
