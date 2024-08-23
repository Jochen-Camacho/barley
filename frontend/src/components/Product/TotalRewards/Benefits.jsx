import { BusFront, CircleDollarSign, FilePen, LampDesk } from "lucide-react";
import ProductHeader from "../ProductHeader";

const Benefits = ({ employee }) => {
  return (
    <div className="mt-5 md:mt-0 md:px-0 px-6">
      <div className="flex flex-col md:shadow-none shadow-md rounded-md">
        <div className="block md:hidden">
          <ProductHeader header={"Benefits"} />
        </div>
        <div className="flex px-8 gap-6 flex-wrap">
          <div className="border p-3 rounded-md min-w-[300px]">
            <h1 className="hidden md:flex font-bold text-lg">Your Benefits</h1>
            <div className="flex gap-4 md:mt-4">
              <div className="flex flex-col">
                <h2 className="text-sm">Annual Benefits Value</h2>
                <h1 className="font-bold text-2xl">
                  $
                  {employee.salary.benefits
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h1>
              </div>
              {/* <div>
              <h2 className="text-sm"># of Dependants</h2>
              <div className="flex gap-2">
                <button>
                  <Minus />
                </button>
                <h1 className="font-bold text-2xl">2</h1>
                <button>
                  <Plus />
                </button>
              </div>
            </div> */}
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap min-w-[350px]">
            <div className=" md:border md:p-3 rounded-md">
              <h1 className="text-nowrap text-lg font-bold pb-2">Work Perks</h1>
              <div className="flex gap-4">
                <div className="flex flex-col p-2">
                  <div className="w-16 h-16 bg-[#E3EAFE] rounded-full flex items-center justify-center">
                    <BusFront size={30} color="hsl(225, 91%, 62%)" />
                  </div>
                  <div className="flex flex-col py-2">
                    <p className=" text-nowrap text-sm font-semibold">
                      Commuting
                    </p>
                    <p className="text-gray-500 text-nowrap text-sm">
                      $50 / month
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  <div className="w-16 h-16 bg-[#E3EAFE] rounded-full flex items-center justify-center">
                    <LampDesk size={30} color="hsl(225, 91%, 62%)" />
                  </div>
                  <div className="flex flex-col py-2">
                    <p className=" text-nowrap text-sm font-semibold">
                      Personal Office
                    </p>
                    <p className="text-gray-500 text-nowrap text-sm">
                      $500 / year
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" md:border md:p-3 rounded-md">
              <h1 className="text-nowrap text-lg font-bold pb-2">
                Personal Finance Benefits
              </h1>
              <div className="flex gap-4">
                <div className="flex flex-col p-2">
                  <div className="w-16 h-16 bg-[#E3EAFE] rounded-full flex items-center justify-center">
                    <FilePen size={30} color="hsl(225, 91%, 62%)" />
                  </div>
                  <div className="flex flex-col py-2">
                    <p className=" text-nowrap text-sm font-semibold">
                      Tax-filing Services
                    </p>
                    <p className="text-gray-500 text-nowrap text-sm">
                      $200 / month
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  <div className="w-16 h-16 bg-[#E3EAFE] rounded-full flex items-center justify-center">
                    <CircleDollarSign size={30} color="hsl(225, 91%, 62%)" />
                  </div>
                  <div className="flex flex-col py-2">
                    <p className=" text-nowrap text-sm font-semibold">
                      RRSP Matching
                    </p>
                    <p className="text-gray-500 text-nowrap text-sm">
                      5% of base salary
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
