import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import EmployeeLogin from "./EmployeeLogin";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "../ui/spinner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const [goToEmployeeForm, setGoToEmployeeForm] = useState(false);

  console.log(isLoading);

  useEffect(() => {
    navigate("/login");
  }, [location.pathname, navigate]);

  return (
    <div className="flex w-full items-center justify-center absolute top-1/2 -translate-y-1/2 ">
      <div className="flex flex-col items-center  shadow-md rounded-md py-4 px-12 border bg-white ">
        <h1 className="text-3xl sm:text-4xl font-bold sm:p-6">Login</h1>

        {goToEmployeeForm ? (
          <div className="w-full flex flex-col">
            <EmployeeLogin />
            <Button
              variant={"link"}
              className="mx-auto"
              onClick={() => setGoToEmployeeForm(false)}
            >
              Go Back
            </Button>
          </div>
        ) : isLoading ? (
          <span className="flex justify-center items-center gap-2 text-xl min-w-[200px] py-4">
            Loading
            <LoadingSpinner />
          </span>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-4">
            <Button
              className="bg-white text-black border text-xl px-10 py-6 hover:bg-gray-50 w-full"
              onClick={() => setGoToEmployeeForm(true)}
            >
              Employee
            </Button>
            <Button
              className="bg-[#5032aa] text-white border text-xl px-10 py-6 hover:bg-[#5f3bc8] w-full flex items-center justify-center gap-2"
              onClick={async () => {
                await login({
                  firstName: "John",
                  lastName: "Doe",
                  email: "johndoe@gmail.com",
                });
                navigate("/");
              }}
            >
              <span>Demo Login</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
