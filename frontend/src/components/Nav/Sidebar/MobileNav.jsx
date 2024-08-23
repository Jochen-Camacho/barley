import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sideBarLinks } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Logs } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HandCoins, Shovel, Users } from "lucide-react";

const getIcon = (icon) => {
  if (icon === "Users") return <Users size={20} />;
  if (icon === "HandCoins") return <HandCoins size={20} />;
  if (icon === "Shovel") return <Shovel size={20} />;
};

const MobileNav = () => {
  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const filterSideBarLinks = sideBarLinks.filter((l) => {
    if (!user.admin) return l.admin !== user.admin;
    else return l;
  });
  return (
    <div className="md:hidden block">
      <Sheet>
        <SheetTrigger className="  text-white">
          <div className="flex gap-2 items-center">
            <Logs />{" "}
            <p className="scroll-m-20 text-xl font-semibold tracking-tight ">
              Barley
            </p>
          </div>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-[#1D0F46]/70 text-gray-300 border-none backdrop-blur-sm max-w-[300px]"
        >
          <SheetHeader>
            <SheetTitle>
              {" "}
              <div className="flex items-center gap-2 border-b border-b-gray-700 pb-8 text-white px-4">
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
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6  px-4">
            {filterSideBarLinks.map((link) => (
              <Link
                to={link.href}
                className="py-2 cursor-pointer flex items-center gap-2"
                key={link.id}
              >
                {getIcon(link.icon)}
                <h3 className="scroll-m-20 text-xl  tracking-tight">
                  {link.value}
                </h3>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
