import ProductHeader from "../Product/ProductHeader";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_META, CHANGE_ROLE, FIND_EMPLOYEE } from "@/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useParams } from "react-router-dom";

const EmployeeProfile = () => {
  const { id } = useParams();
  const form = useForm({
    resolver: zodResolver(z.object({ job: z.string().min(1) })),
    defaultValues: {
      job: "",
    },
  });

  const empResult = useQuery(FIND_EMPLOYEE, {
    variables: { id: Number(id) },
  });
  const jobsResult = useQuery(ALL_META);
  const [changeRole] = useMutation(CHANGE_ROLE, {
    refetchQueries: [{ query: FIND_EMPLOYEE }],
  });

  if (empResult.loading || jobsResult.loading) return <div>Loading</div>;

  console.log(empResult.data);

  const employee = empResult.data.allEmployees[0];

  const min =
    Math.min(...employee.payband.employees.map((e) => e.salary.base)) / 1000 -
    20;

  const max =
    Math.max(...employee.payband.employees.map((e) => e.salary.base)) / 1000 +
    20;

  const getPosition = (salary) => {
    return ((salary - min) / (max - min)) * 100;
  };

  const onSubmit = async (data) => {
    try {
      const jobId = jobsResult.data.allJobs.find(
        (j) => j.title === data.job
      ).id;
      await changeRole({
        variables: {
          id: Number(employee.id),
          jobId: Number(jobId),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md">
      <ProductHeader header={"Employee Profile"} />
      <div className="flex items-center w-full py-10 px-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-20 h-20  rounded-full mb-2 overflow-hidden">
            <img src={employee.image} className=" object-cover w-full h-full" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold">
              {employee.firstName} {employee.lastName}
            </h1>
            <h2 className="text-gray-500 text-sm">{employee.job.title}</h2>
            <h3 className="text-gray-500 text-sm">
              {employee.job.department.title}
            </h3>
          </div>
        </div>
        <div className="border rounded-md p-4 flex flex-col items-center w-full justify-center py-10">
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 mb-2">
              <p className="border-2 px-1 rounded-sm border-green-400 text-green-400 font-semibold text-sm">
                BASE
              </p>
              <p className="border-2 px-1 rounded-sm border-gray-400 text-gray-400  font-semibold text-sm">
                USD
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                USA Pay Zone, {employee.job.department.title}, L
                {employee.job.level}
              </p>
            </div>
          </div>
          <div className="w-full pt-6 px-8 bg-gray-100 pb-12 mt-5">
            <div className="bg-[#C4EFF4] w-full h-6  relative">
              <div className="absolute top-1/2 -translate-y-1/2 bg-[#8275FD] w-[2px] h-6  -translate-x-1/2">
                <div className="text-xs py-1 mt-5 -ml-3">
                  {min}k<p>Low</p>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 bg-[#8275FD] w-[2px] h-6 left-1/2 -translate-x-1/2">
                <div className="text-xs py-1 mt-5  flex flex-col items-center">
                  {(max + min) / 2}k <p>Mid</p>
                </div>
              </div>
              <div
                className=" rounded-full  absolute top-1/2 -translate-y-1/2 left-3/4 -translate-x-1/2"
                style={{ left: `${getPosition(employee.salary.base / 1000)}%` }}
              >
                <div className="border border-[#5e53c4] w-4 h-4 rounded-full relative">
                  <div className=" bg-[#5e53c4] w-2 h-2 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 bg-[#8275FD] w-[2px] h-6 left-[100%] -translate-x-1/2">
                <div className="text-xs py-1 mt-5 -ml-3 ">
                  {max}k<p>High</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-md ">
        <div className=" shadow-md">
          <ProductHeader header={"Assign Role"} />
          <Form {...form}>
            <form
              className="p-4 flex items-center gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name={"job"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={employee.job.title} />
                        </SelectTrigger>
                        <SelectContent>
                          {jobsResult.data.allJobs.map((j) => (
                            <SelectItem key={j.title} value={j.title}>
                              {j.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant={"secondary"}>Confirm</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
