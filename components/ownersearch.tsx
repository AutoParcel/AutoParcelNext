"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Option = {
  OwnerID: string;
  OwnerName: string;
};

type HandleNameChange = (data: Option | undefined ) => void;

interface ComboboxDemoProps {
  options: Option[];
  handleNameChange: HandleNameChange;
}

const ComboboxDemo: React.FC<ComboboxDemoProps> = ({ options, handleNameChange }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState("")
  const [list, setList] = React.useState(options);
  React.useEffect(() => { setList(options) }, [options]);
  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black"
        >
          {value
            ? list.find((option) => {
              return `${option.OwnerID}_${option.OwnerName}`.toLowerCase() == value.toLowerCase()})?.OwnerName
            : "Select Parcel Owner "}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command     filter={(value, search) => {
          let temp = value.toLowerCase();
      if (temp.includes(search.toLowerCase())) return 1;
      return 0;
    }}>
          <CommandInput placeholder="Search or add a name" className="h-9" />
          <CommandList>
            <CommandEmpty>add person btn here</CommandEmpty>
            <CommandGroup>
              {list.map((option) => (
                <CommandItem
                key={option.OwnerID}
                value={`${option.OwnerID}_${option.OwnerName}`.toLowerCase()}
                onSelect={(currentValue) => {
                  let data = list.find((option) => `${option.OwnerID}_${option.OwnerName}`.toLowerCase() == currentValue.toLowerCase())
                  handleNameChange(data)
                  setValue(currentValue.toLowerCase() === value.toLowerCase() ? "" : currentValue.toLowerCase())
                  setOpen(false)
                }}
              >
                <div className="flex flex-col">
                <div className="">{option.OwnerName}</div>
                <div className="text-xs text-primary_red" >{option.OwnerID}</div>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === `${option.OwnerID}_${option.OwnerName}`.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </>
  )
}

export default ComboboxDemo
