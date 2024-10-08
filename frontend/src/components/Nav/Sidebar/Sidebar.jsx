import { Link, useLocation } from "react-router-dom";
import { sideBarLinks } from "/src/constants";
import { HandCoins, Shovel, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const getIcon = (icon) => {
  if (icon === "Users") return <Users size={20} />;
  if (icon === "HandCoins") return <HandCoins size={20} />;
  if (icon === "Shovel") return <Shovel size={20} />;
};

const Sidebar = () => {
  const { getUser, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  if (!user) {
    return (
      <Skeleton
        className={
          "fixed top-0 bg-gray-300 inset-y-0 left-0 lg:max-w-[250px] md:max-w-[200px] h-screen w-full animate-pulse rounded-none"
        }
      />
    );
  }

  const filterSideBarLinks = sideBarLinks.filter((l) => {
    if (!user.admin) return l.admin === user.admin;
    else return l;
  });
  return (
    <aside className="border-r fixed top-0  inset-y-0 left-0 z-20 bg-[#1D0F46] text-gray-300  lg:max-w-[250px] md:max-w-[200px] h-screen w-full md:flex flex-col py-8 hidden flex-shrink-0">
      <div className="flex items-center gap-2 border-b border-b-gray-700 pb-8 px-4">
        <div className="flex items-center gap-[2px]">
          <div className="bg-gray-300 w-3 h-7 rounded-full"></div>
          <div className="flex flex-col  items-center justify-center">
            <div className="bg-gray-300 w-[12px] h-[12px] rounded-full mb-[2px]"></div>
            <div className="bg-gray-300 w-[12px] h-[12px] rounded-full"></div>
            <div></div>
          </div>
        </div>
        <h1
          className=" scroll-m-20 text-3xl font-semibold tracking-tight
                    "
        >
          Barley
        </h1>
      </div>
      <div className="mt-6 px-2">
        {filterSideBarLinks.map((link) => (
          <Link
            to={link.href}
            className={`py-2 cursor-pointer flex items-center rounded-lg px-2 gap-3 ${
              location.pathname === link.href && "bg-gray-100/10 "
            }`}
            key={link.id}
          >
            {getIcon(link.icon)}
            <h3 className="scroll-m-20 text-lg  tracking-tight">
              {link.value}
            </h3>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
