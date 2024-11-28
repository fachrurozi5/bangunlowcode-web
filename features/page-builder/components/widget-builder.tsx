import { Edit, Trash } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

type Props = {
  widgets: TWidget[];
  parentId?: string;
};

const WidgetBuilder = ({ widgets, parentId }: Props) => {
  const {
    handleChangeParent,
    handleSwapWidget,
    handleDragWidget,
    handleSelectedWidget,
  } = widgetWrapperStore.getState();

  const render = ({ id, name, props, style }: TWidget) => {
    switch (name) {
      case "Input":
        return <Input {...props} />;
      case "Label":
        return (
          <Label className="inline-block" style={style}>
            {props.text ?? "Text"}
          </Label>
        );
      case "Card":
        return (
          <Card style={style}>
            {(props["title"] || props["desc"]) && (
              <CardHeader>
                {props["title"] && <CardTitle>{props["title"]}</CardTitle>}
                {props["desc"] && (
                  <CardDescription>{props["desc"]}</CardDescription>
                )}
              </CardHeader>
            )}
            <CardContent>
              <WidgetBuilder widgets={widgets} parentId={id} />
            </CardContent>
          </Card>
        );
      case "Stack":
        return (
          <div className="flex flex-row items-center px-2 py-3">
            <WidgetBuilder widgets={widgets} parentId={id} />
          </div>
        );
      default:
        return <p>{name} coming soon.</p>;
    }
  };

  return widgets
    .filter((widget) => widget.parentId === parentId)
    .map((widget) => (
      <div key={widget.id} className="relative">
        <div
          className="peer cursor-grab border-dashed border-yellow-500 hover:border"
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
          {render(widget)}
        </div>
        <div className="absolute right-[-5rem] top-0 z-40 grid grid-cols-2 gap-1.5 rounded-md border border-yellow-600 bg-yellow-500 p-2 opacity-0 hover:opacity-100 peer-hover:opacity-100">
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-b border-l border-yellow-600 bg-yellow-500"></div>
          <button onClick={() => handleSelectedWidget(widget.id)}>
            <Edit className="text-yellow-200 hover:text-blue-500" />
          </button>
          <button>
            <Trash className="text-yellow-200 hover:text-red-500" />
          </button>
        </div>
      </div>
    ));
};

export default WidgetBuilder;
