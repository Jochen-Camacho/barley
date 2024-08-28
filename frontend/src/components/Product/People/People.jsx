import { addButtonOptions, peopleHeaders, typesOfAddForms } from "@/constants";
import ProductHeader from "../ProductHeader";
import ProductHeaderItem from "../ProductHeaderItem";
import PeopleData from "./PeopleData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, Plus, X } from "lucide-react";
import AddForm from "./AddForm";
import { useQuery } from "@apollo/client";
import { ALL_META } from "@/queries";

const People = () => {
  const [addButton, setAddButton] = useState("Employee");
  const [filterVars, setFilterVars] = useState({
    job: "",
    department: "",
    level: [1, 2, 3, 4],
  });
  const metaResult = useQuery(ALL_META);
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (metaResult.loading) return <div>Loading</div>;

  const headerItemOptions = {
    department: [...new Set(metaResult.data.department.map((d) => d))].sort(
      (a, b) => a.title.localeCompare(b.title)
    ),
    job: [...new Set(metaResult.data.job.map((j) => j))].sort((a, b) =>
      a.title.localeCompare(b.title)
    ),
    level: [...new Set(metaResult.data.job.map((j) => j.level))].sort(
      (a, b) => a - b
    ),
    city: [...new Set(metaResult.data.location.map((l) => l.city))].sort(
      (a, b) => a.localeCompare(b)
    ),
    country: [...new Set(metaResult.data.location.map((l) => l.country))].sort(
      (a, b) => a.localeCompare(b)
    ),
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md lg:max-w-[67vw] md:max-w-[63vw] max-w-[90vw] mx-auto">
      <ProductHeader header={"People"}>
        <div className="flex items-center px-4">
          <Dialog open={isFormOpen}>
            <DialogTrigger
              className="py-1 px-2 border bg-white font-semibold rounded-l-md rounded-r-none justify-start
              text-sm hover:bg-gray-50 "
              onMouseEnter={() => setIsHoveringAdd(true)}
              onMouseLeave={() => setIsHoveringAdd(false)}
              onClick={() => setIsFormOpen(true)}
            >
              {isHoveringAdd ? (
                <p className=" transition-all duration-300 ease-in-out smooth-in">
                  Add {addButton}
                </p>
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add {addButton}</DialogTitle>
              </DialogHeader>
              <DialogClose
                className=" absolute left-[94%] top-[2%]"
                onClick={() => setIsFormOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
              <AddForm
                formTypeData={typesOfAddForms[addButton]}
                options={headerItemOptions}
                closeForm={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="py-1 px-2 border bg-white font-semibold rounded-l-none rounded-r-md flex items-center
               text-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-0 
focus-visible:ring-transparent focus-visible:ring-offset-0"
            >
              <ArrowDown className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {addButtonOptions.map((ado) => (
                <DropdownMenuItem
                  key={ado.id}
                  onClick={() => setAddButton(ado.value)}
                >
                  {ado.value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ProductHeader>

      <div className="p-4 flex flex-col gap-4 ">
        <div className="flex flex-wrap gap-4 items-center">
          {peopleHeaders.map((pbh) => (
            <div key={pbh.id}>
              <ProductHeaderItem
                title={pbh.title}
                options={headerItemOptions[pbh.key]}
                setFilterVars={setFilterVars}
                filterVars={filterVars}
                identifier={pbh.key}
                defaultFilter={pbh.default}
              />
            </div>
          ))}
        </div>

        <div>
          <PeopleData filterVars={filterVars} />
        </div>
      </div>
    </div>
  );
};

export default People;
