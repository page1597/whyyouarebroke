import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export default function Combobox({
  categories,
  category,
  setCategory,
}: {
  categories: {
    title: string;
    href: string;
  }[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="category"
          variant="outline"
          role="combobox"
          size={"sm"}
          aria-expanded={open}
          className="w-[200px] justify-between border-zinc-400 rounded"
        >
          {category ? category : "카테고리"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {categories.map((value) => (
              <CommandItem
                key={value.title}
                value={value.title}
                onSelect={(currentValue) => {
                  setCategory(currentValue === category ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", category === value.title ? "opacity-100" : "opacity-0")} />
                {value.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
