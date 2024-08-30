import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileUploader from "./FileUploader";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const User = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getUser, user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return <Skeleton className={"w-10 h-10 rounded-full bg-gray-300"} />;
  }

  return (
    <div className="lg:px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none ">
          {isAuthenticated && (
            <div className="w-10 h-10 rounded-full overflow-hidden ">
              <img src={user.image} className=" object-cover w-full h-full" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Change Image
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FileUploader
        isDialogOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        userImage={user.image}
        user={user}
        getUser={getUser}
      />
    </div>
  );
};

export default User;
