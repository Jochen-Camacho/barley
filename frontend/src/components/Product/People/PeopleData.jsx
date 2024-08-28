import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import { ALL_EMPLOYEES } from "@/queries";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const PeopleData = ({ filterVars }) => {
  const navigate = useNavigate();

  // console.log(filterVars);
  const result = useQuery(ALL_EMPLOYEES, {
    variables: { ...filterVars },
  });

  if (result.loading) return;

  // console.log(result);

  return (
    <ScrollArea className="border rounded-md overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 text-nowrap">
            <TableHead className="font-semibold  text-black ">
              First Name
            </TableHead>
            <TableHead className="font-semibold  text-black ">
              Last Name
            </TableHead>
            <TableHead className="font-semibold  text-black ">
              Job Function
            </TableHead>
            <TableHead className="font-semibold w-[80px] text-black">
              Level
            </TableHead>
            <TableHead className="font-semibold text-black">
              Job Title
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.loading ? (
            <TableRow>
              <TableCell>Loading</TableCell>
            </TableRow>
          ) : (
            result.data.employee.map((e) => (
              <TableRow
                key={e.id}
                onClick={() => navigate(`/people/${e.id}`)}
                className="cursor-pointer"
              >
                <TableCell className=" whitespace-nowrap flex items-center gap-2">
                  <div className="w-8 h-8  rounded-full  overflow-hidden ">
                    <img
                      src={e.image}
                      className=" object-cover w-full h-full"
                    />
                  </div>
                  {e.firstName}
                </TableCell>
                <TableCell className=" whitespace-nowrap">
                  {e.lastName}
                </TableCell>
                <TableCell className=" whitespace-nowrap">
                  {e.job.department.title}
                </TableCell>

                <TableCell className=" whitespace-nowrap">
                  L{e.job.level}
                </TableCell>
                <TableCell className=" whitespace-nowrap">
                  {e.job.title}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default PeopleData;
