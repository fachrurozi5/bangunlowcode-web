import { Link2, Link2Off } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { widgetWrapperStore } from "@/features/page-builder/store/widget-wrapper";
import { TWidget } from "@/features/page-builder/types";

export const LayoutConfiguration = () => {
  return (
    <div>
      <h4 className="mb-2 text-xl font-bold">Layout</h4>
      <Tabs defaultValue="padding">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="padding">Padding</TabsTrigger>
          <TabsTrigger value="margin">Margin</TabsTrigger>
        </TabsList>
        <TabsContent value="padding">
          <PaddingConfiguration />
        </TabsContent>
        <TabsContent value="margin">
          <MarginConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PaddingConfiguration = () => {
  const { handleChangeStyles, selectedWidget: defaultState } =
    widgetWrapperStore.getState();

  const [chain, setChain] = React.useState<boolean>(false);
  const [selectedWidget, setSelectedWidget] = React.useState<TWidget>(
    defaultState!,
  );

  widgetWrapperStore.subscribe((state) => {
    setSelectedWidget(state.selectedWidget!);
  });

  const setAll = (id: string, value: any) => {
    handleChangeStyles(id, `paddingLeft`, value);
    handleChangeStyles(id, `paddingTop`, value);
    handleChangeStyles(id, `paddingRight`, value);
    handleChangeStyles(id, `paddingBottom`, value);
  };

  useEffect(() => {
    if (!chain) return;

    const id = selectedWidget!.id;
    const value = selectedWidget!.style.paddingLeft;

    setAll(id, value);
  }, [chain]);

  return (
    <div className="mt-3 px-2">
      <div className="grid grid-cols-2 gap-3">
        {["Left", "Top", "Right", "Bottom"].map((name) => (
          <div key={name} className="grid items-center gap-1.5">
            <Label htmlFor={name}>{name}</Label>
            <div className="relative">
              <Input
                id={name}
                placeholder="px"
                className="pr-9"
                value={selectedWidget?.style[`padding${name}`] ?? ""}
                onChange={(event) => {
                  let id = selectedWidget!.id;
                  if (/^\d+$/.test(event.target.value)) {
                    const value = Number(event.target.value);
                    if (chain) {
                      setAll(id, value);
                    } else {
                      handleChangeStyles(id, `padding${name}`, value);
                    }
                  }

                  if (event.target.value === "") {
                    if (chain) {
                      setAll(id, "");
                    } else {
                      handleChangeStyles(id, `padding${name}`, "");
                    }
                  }
                }}
              />
              <div
                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => {
                  setChain(!chain);
                }}
              >
                {chain ? <Link2 /> : <Link2Off className="h-5 w-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MarginConfiguration = () => {
  const { handleChangeStyles, selectedWidget: defaultState } =
    widgetWrapperStore.getState();

  const [chain, setChain] = React.useState<boolean>(false);
  const [selectedWidget, setSelectedWidget] = React.useState<TWidget>(
    defaultState!,
  );

  widgetWrapperStore.subscribe((state) => {
    setSelectedWidget(state.selectedWidget!);
  });

  const setAll = (id: string, value: any) => {
    handleChangeStyles(id, `marginLeft`, value);
    handleChangeStyles(id, `marginTop`, value);
    handleChangeStyles(id, `marginRight`, value);
    handleChangeStyles(id, `marginBottom`, value);
  };

  useEffect(() => {
    if (!chain) return;

    const id = selectedWidget!.id;
    const value = selectedWidget!.style.marginLeft;

    setAll(id, value);
  }, [chain]);

  return (
    <div className="mt-3 px-2">
      <div className="grid grid-cols-2 gap-3">
        {["Left", "Top", "Right", "Bottom"].map((name) => (
          <div key={name} className="grid items-center gap-1.5">
            <Label htmlFor={name}>{name}</Label>
            <div className="relative">
              <Input
                id={name}
                placeholder="px"
                className="pr-9"
                value={selectedWidget?.style[`margin${name}`] ?? ""}
                onChange={(event) => {
                  let id = selectedWidget!.id;
                  if (/^\d+$/.test(event.target.value)) {
                    const value = Number(event.target.value);
                    if (chain) {
                      setAll(id, value);
                    } else {
                      handleChangeStyles(id, `margin${name}`, value);
                    }
                  }

                  if (event.target.value === "") {
                    if (chain) {
                      setAll(id, "");
                    } else {
                      handleChangeStyles(id, `margin${name}`, "");
                    }
                  }
                }}
              />
              <div
                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => {
                  setChain(!chain);
                }}
              >
                {chain ? <Link2 /> : <Link2Off className="h-5 w-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
