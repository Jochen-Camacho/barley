import { useEffect, useState } from "react";

const PayBandVisualization = ({ min, max, employees }) => {
  const [isHovered, setIsHovered] = useState({});

  const salaries = employees.map((e) => e.salary.base);

  useEffect(() => {
    salaries.forEach((s) => {
      setIsHovered({ ...isHovered, [s]: false });
    });
  }, []);

  const getPosition = (salary) => {
    return ((salary - min) / (max - min)) * 100;
  };

  const salaryFreq = new Map();

  const handleMouseEnter = (salary) => {
    setIsHovered({ ...isHovered, [salary]: true });
  };

  const handleMouseLeave = (salary) => {
    setIsHovered({ ...isHovered, [salary]: false });
  };

  return (
    <div className="relative w-full ">
      <div
        className="absolute top-1/2 h-6 bg-[#C4EFF4] -translate-y-1/2 z-0"
        style={{
          left: `${getPosition(Math.min(...salaries))}%`,
          width: `${
            getPosition(Math.max(...salaries)) -
            getPosition(Math.min(...salaries))
          }%`,
        }}
      ></div>
      {salaries.map((salary, index) => {
        if (salaryFreq.has(salary))
          salaryFreq.set(salary, salaryFreq.get(salary) + 1);
        else salaryFreq.set(salary, 1);
        return (
          <div
            key={index}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 "
            style={{ left: `${getPosition(salary)}%` }}
          >
            <div className="relative ">
              {isHovered[salary] && (
                <div
                  className=" absolute z-10 top-[100%] max-h-[150px] left-1/2 -translate-x-1/2 bg-white border p-2 min-w-[150px] w-full max-w-[200px]  overflow-y-auto"
                  onMouseEnter={() => handleMouseEnter(salary)}
                  onMouseLeave={() => handleMouseLeave(salary)}
                >
                  {employees.map((e, index) => {
                    if (e.salary.base === salary) {
                      return (
                        <div
                          className="p-2 cursor-pointer text-nowrap flex items-center gap-2"
                          key={index}
                        >
                          <img
                            src={e.image}
                            className="rounded-full w-5 h-5 object-cover"
                          />
                          {e.firstName} {e.lastName}
                        </div>
                      );
                    }
                  })}
                </div>
              )}
              {salaryFreq.get(salary) > 1 ? (
                <div
                  className="bg-[#8275FD] w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(salary)}
                  onMouseLeave={() => handleMouseLeave(salary)}
                >
                  <p className=" text-xs text-white font-bold">
                    {salaryFreq.get(salary)}
                  </p>
                </div>
              ) : (
                <div
                  className="bg-[#B7ADFA] w-3 h-3 rounded-full"
                  onMouseEnter={() => handleMouseEnter(salary)}
                  onMouseLeave={() => handleMouseLeave(salary)}
                ></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PayBandVisualization;
