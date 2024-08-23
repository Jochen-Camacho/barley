import { Square } from "lucide-react";

const SalaryItem = ({ salaryType, salary, color }) => {
  return (
    <div
      className={`flex  items-center  justify-between text-sm py-1 border px-2 rounded-md`}
      style={{
        backgroundColor: `${color
          .replace("hsl", "hsla")
          .replace(")", ", 0.5)")}`,
      }}
    >
      <div className="flex gap-2 items-center">
        <Square
          color={color}
          style={{ backgroundColor: color }}
          className="overflow-hidden rounded-md w-5 h-5"
        />
        <p className=" font-bold">
          {salaryType.charAt(0).toUpperCase() + salaryType.slice(1)}
        </p>
      </div>
      <div
        className="font-bold border-2 px-2 rounded-sm"
        style={{ borderColor: color }}
      >
        ${salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
    </div>
  );
};

export default SalaryItem;
