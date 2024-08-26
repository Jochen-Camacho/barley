import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PayBandVisualization from "./PayBandVisualization";
import { useQuery } from "@apollo/client";
import { ALL_PAY_BANDS } from "@/queries";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PayBandsData = ({ filterVars }) => {
  const results = useQuery(ALL_PAY_BANDS, {
    variables: { ...filterVars },
  });
  if (results.loading) return <div>Loading</div>;

  const range = (results.data.maxEmployeeBaseSalary + 30000) / 1000;
  let ranges = [];

  for (let i = 0; i < 4; i++) {
    ranges.push(Math.floor((range / 3) * i));
  }

  return (
    <ScrollArea className="w-full  pb-2 whitespace-nowrap rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold w-[150px] text-black ">
              Job Function
            </TableHead>
            <TableHead className="font-semibold w-[80px] text-black">
              Level
            </TableHead>
            <TableHead className="font-semibold text-black">
              Job Title
            </TableHead>
            <TableHead className="flex justify-between items-center w-full  min-w-[300px] ">
              {ranges.map((r) => (
                <div className="text-xs" key={r}>
                  ${r}k
                </div>
              ))}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.data.allPayBands.map((pb, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">
                {pb.department.title}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                L{pb.job.level}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {pb.job.title}
              </TableCell>
              <TableCell>
                <PayBandVisualization
                  min={0}
                  max={
                    Math.max(...pb.employees.map((e) => e.salary.base)) + 30000
                  }
                  employees={pb.employees.map((e) => e)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default PayBandsData;
