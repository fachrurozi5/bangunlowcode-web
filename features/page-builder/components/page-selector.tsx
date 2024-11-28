"use client";

import { Check, ChevronRight, ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const pages = [
  {
    value: "dashboard",
    label: "Dashboard",
  },
  {
    value: "appointments",
    label: "Appointments",
  },
];

const PageSelector = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? pages.find((page) => page.value == value)?.label
            : "Select page..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search page..." className="h-9" />
          <CommandList>
            <CommandEmpty>No page found.</CommandEmpty>
            <CommandGroup>
              {pages.map((page) => (
                <CommandItem
                  key={page.value}
                  value={page.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue == value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <ChevronRight />
                  {page.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === page.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <Plus />
                Add new page
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PageSelector;
