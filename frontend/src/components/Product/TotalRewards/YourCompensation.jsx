import ProductHeader from "../ProductHeader";

const YourCompensation = ({ employee }) => {
  const min =
    Math.min(...employee.payband.employees.map((e) => e.salary.base)) - 20000;

  const max =
    Math.max(...employee.payband.employees.map((e) => e.salary.base)) + 20000;

  const getPosition = (salary) => {
    return ((salary - min) / (max - min)) * 100;
  };
  return (
    <div className=" md:mt-6 mt-10 md:px-0 px-6">
      <div className="flex flex-col md:shadow-none shadow-md rounded-md">
        <div className="block md:hidden">
          <ProductHeader header={"Your Compensation"} />
        </div>
        <div className="flex flex-wrap p-8 gap-6">
          <div className="border p-3 flex gap-3 rounded-md sm:min-w-[300px]">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={employee.image}
                className=" object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="font-semibold text-md">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-gray-500 text-md">{employee.job.title}</p>
              <p className="text-gray-500">{employee.location.city}</p>
              <p className="text-gray-500">{employee.location.country}</p>
            </div>
          </div>
          <div className="border p-3 flex-grow sm:min-w-[300px] rounded-md">
            <h1 className="font-semibold text-md">Your Pay Band</h1>
            <div className="w-full pb-8 pt-7 px-8 bg-gray-100 rounded-md mt-2">
              <div className="bg-blue-500 w-full h-2 rounded-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 text-xs py-1 mt-5 -ml-4">
                  ${min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div
                  className="w-4 h-4 rounded-full  absolute top-1/2 -translate-y-1/2  -translate-x-1/2"
                  style={{
                    left: `${getPosition(employee.salary.base)}%`,
                  }}
                >
                  <img
                    src={employee.image}
                    className=" object-cover w-full h-full rounded-full"
                  />
                  <div className="text-xs py-1 -mt-9 -ml-4">
                    $
                    {employee.salary.base
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 text-xs py-1 mt-5 -mr-4 left-[100%] -translate-x-1/2">
                  ${max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCompensation;
