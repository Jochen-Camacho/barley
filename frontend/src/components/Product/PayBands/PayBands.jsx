import { payBandsHeaders } from "@/constants";
import PayBandsData from "./PayBandsData";
import ProductHeader from "../ProductHeader";
import ProductHeaderItem from "../ProductHeaderItem";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_META } from "@/queries";

const PayBands = () => {
  const [filterVars, setFilterVars] = useState({
    job: "",
    department: "",
    level: [1, 2, 3, 4],
  });
  const jobsResult = useQuery(ALL_META);

  if (jobsResult.loading) return <div>Loading</div>;

  const headerItemOptions = {
    department: [
      ...new Set(jobsResult.data.job.map((j) => j.department.title)),
    ].sort((a, b) => a.localeCompare(b)),
    job: [...new Set(jobsResult.data.job.map((j) => j.title))].sort((a, b) =>
      a.localeCompare(b)
    ),
    level: [...new Set(jobsResult.data.job.map((j) => j.level))].sort(
      (a, b) => a - b
    ),
  };

  return (
    <div className="w-full lg:max-w-[67vw] md:max-w-[63vw] max-w-[90vw]  bg-white shadow-md rounded-md mx-auto">
      <div>
        <ProductHeader header={"Pay Bands"} />
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            {payBandsHeaders.map((pbh) => (
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
          <div className="w-full overflow-hidden">
            <PayBandsData filterVars={filterVars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayBands;
