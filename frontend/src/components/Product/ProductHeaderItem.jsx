import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

const ProductHeaderItem = ({
  title,
  options,
  setFilterVars,
  filterVars,
  identifier,
  defaultFilter,
}) => {
  const [triggerName, setTriggerName] = useState(title);
  console.log(typeof options[0] === "object");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="border rounded-md shadow-sm flex items-center justify-between gap-1 py-1 px-2 focus-visible:outline-none  
 hover:bg-gray-50 min-w-[130px] max-w-[130px] w-full text-sm font-semibold"
      >
        <span className="truncate">{triggerName}</span>
        <ArrowDown size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setTriggerName(title);
            setFilterVars({ ...filterVars, [identifier]: defaultFilter });
          }}
        >
          All
        </DropdownMenuItem>
        {options
          ? options.map((o) => (
              <DropdownMenuItem
                key={typeof o === "object" ? o.id : o}
                onClick={() => {
                  setFilterVars({ ...filterVars, [identifier]: o });
                  setTriggerName(o);
                }}
              >
                {typeof o === "object" ? o.title : o}
              </DropdownMenuItem>
            ))
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductHeaderItem;
