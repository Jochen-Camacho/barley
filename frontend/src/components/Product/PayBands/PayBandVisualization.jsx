import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PayBandVisualization = ({ min, max, employees }) => {
  const [isHovered, setIsHovered] = useState({});
  const [hoverData, setHoverData] = useState({
    hoverItem: null,
    position: { top: 0, left: 0 },
  });

  const salaries = employees.map((e) => e.salary.base);

  useEffect(() => {
    salaries.forEach((s) => {
      setIsHovered({ ...isHovered, [s]: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosition = (salary) => {
    return ((salary - min) / (max - min)) * 100;
  };

  const salaryFreq = new Map();
  const handleMouseEnter = (e, salary) => {
    const rect = e.target.getBoundingClientRect();
    setIsHovered((prev) => ({ ...prev, [salary]: true }));
    setHoverData({
      hoverItem: salary,
      position: {
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX + rect.width / 2,
      },
    });
  };

  const handleMouseLeave = (salary) => {
    setIsHovered((prev) => ({ ...prev, [salary]: false }));
    setHoverData({
      hoverItem: null,
      position: { top: 0, left: 0 },
    });
  };

  return (
    <div className="relative w-full z-0">
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
            <div>
              {salaryFreq.get(salary) > 1 ? (
                <div
                  className="bg-[#8275FD] w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                  onMouseEnter={(e) => handleMouseEnter(e, salary)}
                  onMouseLeave={() => handleMouseLeave(salary)}
                >
                  <p className=" text-xs text-white font-bold">
                    {salaryFreq.get(salary)}
                  </p>
                </div>
              ) : (
                <div
                  className="bg-[#B7ADFA] w-3 h-3 rounded-full"
                  onMouseEnter={(e) => handleMouseEnter(e, salary)}
                  onMouseLeave={() => handleMouseLeave(salary)}
                ></div>
              )}
            </div>
          </div>
        );
      })}
      {hoverData.hoverItem &&
        createPortal(
          <div
            className="absolute z-50 p-2 bg-white shadow-md border rounded"
            style={{
              top: hoverData.position.top,
              left: hoverData.position.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            {employees.map((e, index) => {
              if (e.salary.base === hoverData.hoverItem) {
                return (
                  <div
                    className="p-2 cursor-pointer flex items-center gap-2"
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
          </div>,
          document.body
        )}
    </div>
  );
};

export default PayBandVisualization;
